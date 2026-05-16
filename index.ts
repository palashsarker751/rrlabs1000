import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * RRLabs Webhook Engine
 * Purpose: Secure Payment Sync between Lemon Squeezy & Supabase
 * Architect: Palash Sarker
 */

async function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifySignature(secret: string, body: string, signature: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  const expectedSignature = await toHex(sig);
  return signature === expectedSignature;
}

Deno.serve(async (req) => {
  try {
    const secret = Deno.env.get("LEMON_SQUEEZY_WEBHOOK_SECRET");
    const signature = req.headers.get("x-signature");
    const rawBody = await req.text();

    // 1. Signature Validation (Security Gate)
    if (!secret || !signature || !(await verifySignature(secret, rawBody, signature))) {
      console.error("[RRLabs Security] Unauthorized Webhook Attempt.");
      return new Response("Unauthorized", { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventName = event.meta.event_name;
    const data = event.data.attributes;
    const userEmail = data.user_email;
    const variantId = data.variant_id; // প্যান আইডি ট্র্যাক করার জন্য

    // 2. Initialize Supabase Admin
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 3. Logic based on Events
    if (eventName === "order_created" || eventName === "subscription_created") {
      
      // ডায়নামিক রিকভারি লিমিট সেট করা (Variant ID অনুযায়ী)
      // উদাহরণ: Variant ID 123456 যদি প্রো প্ল্যান হয় তবে লিমিট ১০০০
      const recoveryLimit = (variantId === "YOUR_PRO_VARIANT_ID") ? 1000 : 350;

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          plan_status: "active",
          plan_name: data.variant_name || "Standard",
          recovery_attempts_left: recoveryLimit,
          last_payment_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("email", userEmail);

      if (error) throw error;
      console.log(`%c ✅ RRLabs Activation: ${userEmail} | Limit: ${recoveryLimit}`, "color: #10b981; font-weight: bold;");
    }

    // 4. Handle Subscription Cancellations
    if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
        await supabaseAdmin
            .from("profiles")
            .update({ plan_status: "expired", updated_at: new Date().toISOString() })
            .eq("email", userEmail);
        
        console.log(`[RRLabs] Account Suspended: ${userEmail}`);
    }

    return new Response("Webhook Processed Successfully", { status: 200 });

  } catch (err) {
    console.error("[RRLabs Webhook Error]:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    });
  }
});
