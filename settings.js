// Initialize Supabase (Ensure supabase-config.js is loaded first)
document.addEventListener('DOMContentLoaded', async () => {
    
    // ১. ডাটা লোড করা (Fetch existing settings)
    const loadSettings = async () => {
        try {
            // আপনার প্রোফাইল ডাটা ফেচ করা (উদাহরণস্বরূপ 'user_settings' টেবিল থেকে)
            // const { data, error } = await supabase.from('user_settings').select('*').single();
            // if (data) {
            //    document.getElementById('ai-prompt').value = data.ai_prompt;
            //    document.getElementById('webhook-url').value = data.webhook_url;
            // }
            console.log("Settings Protocol: Ready");
        } catch (err) {
            console.error("Load Error:", err.message);
        }
    };

    // ২. এআই প্রম্পট সেভ করা
    window.saveAI = async (btn) => {
        const prompt = document.getElementById('ai-prompt').value;
        const originalText = btn.innerText;
        
        btn.innerText = "SYNCING LOGIC...";
        btn.disabled = true;

        // Supabase Update Logic
        /*
        const { error } = await supabase
            .from('user_settings')
            .update({ ai_prompt: prompt })
            .eq('user_id', currentUserId);
        */

        setTimeout(() => {
            btn.innerText = "LOGIC SAVED";
            btn.classList.add('bg-blue-600');
            btn.disabled = false;
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-blue-600');
            }, 2000);
        }, 1200);
    };

    // ৩. প্রোফাইল আপডেট করা
    window.updateProfile = async (btn) => {
        const originalText = btn.innerText;
        btn.innerText = "UPDATING IDENTITY...";
        
        // এখানে আপনার আপডেট লজিক বসবে
        
        setTimeout(() => {
            btn.innerText = "IDENTITY UPDATED";
            btn.classList.add('bg-blue-600');
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-blue-600');
            }, 2000);
        }, 1000);
    };

    // ৪. কিউআর কোড জেনারেশন (WhatsApp Pairing)
    window.startQRScan = (btn) => {
        const container = document.getElementById('qr-container');
        btn.innerText = "ENCRYPTING...";
        btn.disabled = true;
        
        setTimeout(() => {
            container.innerHTML = `
                <div class="flex flex-col items-center animate-slideUp">
                    <div class="bg-white p-6 rounded-[40px] shadow-2xl border border-slate-50 mb-8">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=RRLabs_Auth_${Date.now()}" alt="QR" class="rounded-2xl">
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <p class="text-[11px] font-black text-blue-600 uppercase tracking-widest">Awaiting Secure Handshake...</p>
                    </div>
                    <button onclick="location.reload()" class="mt-8 text-[10px] font-bold text-slate-300 uppercase hover:text-slate-900 transition underline underline-offset-4">Cancel Protocol</button>
                </div>
            `;
        }, 1500);
    };

    loadSettings();
});

// ট্যাব সুইচিং লজিক (গ্লোবাল স্কোপে রাখা হয়েছে HTML থেকে কল করার জন্য)
window.switchTab = (btn, tabId) => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.remove('active');
        t.classList.add('text-slate-400');
    });
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
    btn.classList.remove('text-slate-400');
};

// ক্লিপবোর্ড লজিক
window.copyWebhook = (btn) => {
    const urlInput = document.getElementById('webhook-url');
    navigator.clipboard.writeText(urlInput.value).then(() => {
        const original = btn.innerText;
        btn.innerText = "COPIED";
        btn.classList.add('bg-green-600');
        setTimeout(() => {
            btn.innerText = original;
            btn.classList.remove('bg-green-600');
        }, 2000);
    });
};
