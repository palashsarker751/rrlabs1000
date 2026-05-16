/**
 * RRLABS API DOCUMENTATION ENGINE
 * Handles copy, interactive playground, and smooth navigation
 */

// ১. কপি টু ক্লিপবোর্ড ফাংশন
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "COPIED!";
        btn.classList.add('text-green-500');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('text-green-500');
        }, 2000);
    });
}

// ২. ইন্টারঅ্যাক্টিভ প্লেগ্রাউন্ড (Test Function)
async function testWebhook() {
    const email = document.getElementById('test-email').value;
    const responseBox = document.getElementById('test-response');
    const btn = document.getElementById('test-btn');

    if (!email) {
        alert("Please enter a test email.");
        return;
    }

    btn.innerText = "CONNECTING TO RRLABS...";
    btn.disabled = true;
    responseBox.innerHTML = `> Initiating handshake...<br>> Sending payload to v1/webhook...`;

    // Simulate API Call
    setTimeout(() => {
        responseBox.innerHTML = `
<span class="text-green-500">{
  "status": 202,
  "message": "Accepted",
  "task_id": "rec_auto_${Math.floor(Math.random()*10000)}",
  "ai_sequence": "Gemini-Hyper-Personalized",
  "log": "Sequence scheduled for ${email}"
}</span>`;
        btn.innerText = "EXECUTE TEST REQUEST";
        btn.disabled = false;
    }, 1500);
}

// ৩. সাইডবার অ্যাক্টিভ স্টেট স্ক্রোল হ্যান্ডলার
window.addEventListener('scroll', () => {
    const sections = ['intro', 'auth', 'webhooks', 'playground'];
    let current = '';

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) current = section;
        }
    });

    // Update Sidebar Links
    document.querySelectorAll('aside a').forEach(link => {
        link.classList.remove('sidebar-link-active');
        link.classList.add('text-slate-400');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('sidebar-link-active');
            link.classList.remove('text-slate-400');
        }
    });
});

console.log("RRLabs API Docs Engine: Operational");
