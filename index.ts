<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revenue Recovery Labs | Gemini AI Recovery</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); }
        .hero-gradient { background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent); }
        .mobile-menu { display: none; transition: 0.3s ease; }
        .mobile-menu.active { display: block; animation: slideDown 0.3s ease-out; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .pricing-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .pricing-card:hover { transform: translateY(-10px); border-color: #2563eb; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased hero-gradient">

    <nav class="fixed top-0 left-0 right-0 z-[100] px-4 py-4">
        <div class="max-w-7xl mx-auto glass rounded-2xl px-5 py-3 flex justify-between items-center shadow-xl shadow-blue-900/5">
            <a href="/" class="flex items-center gap-3">
                <img src="logo.png" alt="RRLABS" class="h-10 w-10 object-contain rounded-lg">
                <div class="flex flex-col">
                    <span class="font-black text-lg tracking-tighter leading-none uppercase">REVENUE RECOVERY</span>
                    <span class="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">Labs</span>
                </div>
            </a>

            <div class="hidden lg:flex items-center gap-8" id="desktop-links"></div>

            <div class="flex items-center gap-3">
                <div id="auth-buttons" class="hidden lg:block"></div>
                <button id="menu-toggle" class="p-2 bg-slate-100 rounded-xl hover:bg-blue-50 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 8h16M4 16h16"></path></svg>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="mobile-menu absolute top-full left-4 right-4 mt-3 glass rounded-[32px] p-8 shadow-2xl border border-white">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10" id="menu-grid"></div>
        </div>
    </nav>

    <header class="pt-48 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 animate-pulse">
            🚀 14-Day Free Trial Available
        </div>
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic">
            Recover <span class="text-blue-600">23%</span> <br> of Lost Revenue
        </h1>
        <p class="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
            AI-powered WhatsApp & Email recovery sequences. Personalized by **Gemini AI** to turn abandoned carts into successful orders.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="handlePricingAction()" class="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition shadow-2xl shadow-blue-500/40">Start Free Trial</button>
            <a href="#calculator" class="glass px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 justify-center">ROI Calculator →</a>
        </div>
    </header>

    <section id="pricing" class="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 class="text-4xl font-black tracking-tighter mb-16 uppercase italic">Flexible Packages</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass p-8 rounded-[32px] pricing-card">
                <h3 class="font-black text-xl mb-4 uppercase">Free</h3>
                <div class="mb-6"><span class="text-4xl font-black">$0</span></div>
                <ul class="text-sm text-slate-500 space-y-4 mb-8 text-left font-bold">
                    <li>✓ 50 Attempts / month</li>
                    <li>✓ Basic AI Content</li>
                    <li>✓ No Success Fee</li>
                </ul>
                <button onclick="handlePricingAction('free')" class="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Get Started</button>
            </div>

            <div class="glass p-8 rounded-[32px] pricing-card border-blue-500 border-2 relative scale-105 bg-white">
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Popular</div>
                <h3 class="font-black text-xl mb-4 uppercase text-blue-600">Standard</h3>
                <div class="mb-6"><span class="text-4xl font-black">$29</span><span class="text-sm text-slate-400">/mo</span></div>
                <ul class="text-sm text-slate-500 space-y-4 mb-8 text-left font-bold">
                    <li>✓ 350 Attempts / month</li>
                    <li>✓ + 5% Success Fee</li>
                    <li>✓ WhatsApp & Email AI</li>
                </ul>
                <button onclick="handlePricingAction('standard')" class="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20">Select Plan</button>
            </div>

            <div class="glass p-8 rounded-[32px] pricing-card">
                <h3 class="font-black text-xl mb-4 uppercase">Premium</h3>
                <div class="mb-6"><span class="text-4xl font-black">$99</span><span class="text-sm text-slate-400">/mo</span></div>
                <ul class="text-sm text-slate-500 space-y-4 mb-8 text-left font-bold">
                    <li>✓ 1,050 Attempts / month</li>
                    <li>✓ + 5% Success Fee</li>
                    <li>✓ Priority Support</li>
                </ul>
                <button onclick="handlePricingAction('premium')" class="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Select Plan</button>
            </div>
        </div>
    </section>

    <footer class="bg-white border-t border-slate-100 py-12 px-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
                <img src="logo.png" class="h-8 w-8 object-contain">
                <span class="font-black text-lg tracking-tighter">REVENUE RECOVERY LABS</span>
            </div>
            <p class="text-[10px] text-slate-400 font-black uppercase">© 2026 RRLABS. Built by Palash Sarker</p>
        </div>
    </footer>

    <div id="auth-modal" class="fixed inset-0 z-[200] hidden flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
        <div class="glass max-w-md w-full rounded-[40px] p-10 relative border border-white">
            <h2 class="text-3xl font-black mb-6 uppercase italic">Welcome Back</h2>
            <button onclick="loginMock()" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest mb-4">Login with Google</button>
            <button onclick="toggleAuth()" class="w-full text-slate-400 font-black text-[10px] uppercase">Close</button>
        </div>
    </div>

    <script>
        // --- LOGIC ---
        let isLoggedIn = false; 
        let hasActivePlan = false; 

        function handlePricingAction(plan) {
            if (!isLoggedIn) {
                // ১. নতুন ইউজার বা লগআউট থাকলে লগইন মোডাল
                toggleAuth();
            } else if (isLoggedIn && !hasActivePlan) {
                // ২. লগইন আছে কিন্তু প্ল্যান নাই, বিলিং পেজে যান
                window.location.href = 'billing.html';
            } else {
                // ৩. একটিভ ইউজার হলে সরাসরি ড্যাশবোর্ড
                window.location.href = 'dashboard.html';
            }
        }

        function toggleAuth() { document.getElementById('auth-modal').classList.toggle('hidden'); }
        
        function loginMock() {
            isLoggedIn = true;
            // সিমুলেশন: লগইনের পর যদি তার এক্টিভ প্ল্যান থাকে
            hasActivePlan = true; 
            toggleAuth();
            updateNav();
            window.location.href = 'dashboard.html';
        }

        function updateNav() {
            const authBtn = document.getElementById('auth-buttons');
            authBtn.innerHTML = isLoggedIn ? 
                `<a href="dashboard.html" class="bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase">Dashboard</a>` :
                `<button onclick="toggleAuth()" class="font-black text-[10px] uppercase text-slate-500">Login</button>`;
        }

        updateNav();
    </script>
</body>
</html>
