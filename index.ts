<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revenue Recovery Labs | Gemini AI Abandoned Cart Recovery</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); }
        .hero-gradient { background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent); }
        .pricing-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
        .pricing-card:hover { transform: translateY(-10px); border-color: #2563eb; box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1); }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased hero-gradient">

    <nav class="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
        <div class="max-w-7xl mx-auto glass rounded-2xl px-5 py-3 flex justify-between items-center shadow-xl shadow-blue-900/5">
            <a href="/" class="flex items-center gap-3">
                <img src="logo.png" alt="RRLABS" class="h-10 w-10 rounded-xl object-contain">
                <div class="flex flex-col">
                    <span class="font-black text-lg tracking-tighter leading-none uppercase italic">REVENUE RECOVERY</span>
                    <span class="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">Labs</span>
                </div>
            </a>
            <div id="auth-buttons" class="flex items-center gap-3">
                </div>
        </div>
    </nav>

    <header class="pt-48 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
            🚀 14-Day Free Trial Available
        </div>
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase">
            Recover <span class="text-blue-600 underline decoration-blue-100">23%</span> <br> of Lost Orders
        </h1>
        <p class="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium italic">
            Automated WhatsApp & Email recovery sequences powered by **Gemini AI**. Hyper-personalized messages that actually convert.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="handlePricingAction()" class="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition shadow-2xl shadow-blue-500/40">Get Started Free</button>
            <a href="#pricing" class="glass px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 justify-center">View Tiers ↓</a>
        </div>
    </header>

    <section id="pricing" class="py-24 px-6 max-w-[95rem] mx-auto text-center">
        <h2 class="text-4xl font-black tracking-tighter mb-16 italic uppercase">Simple, Transparent Pricing</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div class="glass p-8 rounded-[32px] pricing-card">
                <div>
                    <h3 class="font-black text-xs text-blue-600 mb-2 uppercase tracking-widest italic">Tier 01</h3>
                    <h2 class="text-2xl font-black mb-4 italic uppercase">Free</h2>
                    <div class="mb-8"><span class="text-4xl font-black">$0</span></div>
                    <ul class="text-[11px] font-bold text-slate-500 space-y-4 mb-8 text-left uppercase italic leading-loose">
                        <li>✓ 50 attempts/mo</li>
                        <li>✓ Basic AI Content</li>
                        <li>✓ No success fee</li>
                        <li>✓ Email Support</li>
                    </ul>
                </div>
                <button onclick="handlePricingAction('free')" class="w-full py-4 bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest">Select Plan</button>
            </div>

            <div class="glass p-8 rounded-[32px] pricing-card border-blue-500 bg-white scale-105 z-10 shadow-2xl">
                <div>
                    <h3 class="font-black text-xs text-blue-600 mb-2 uppercase tracking-widest italic">Tier 02</h3>
                    <h2 class="text-2xl font-black mb-4 italic uppercase text-blue-600">Standard</h2>
                    <div class="mb-8"><span class="text-4xl font-black">$29</span><span class="text-xs text-slate-400">/mo</span></div>
                    <ul class="text-[11px] font-bold text-slate-600 space-y-4 mb-8 text-left uppercase italic leading-loose">
                        <li>✓ 350 attempts/mo</li>
                        <li>✓ 5% success fee</li>
                        <li class="text-blue-600">✓ Gemini AI Personalization</li>
                        <li>✓ WhatsApp + Email</li>
                    </ul>
                </div>
                <button onclick="handlePricingAction('standard')" class="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Get Started</button>
            </div>

            <div class="glass p-8 rounded-[32px] pricing-card">
                <div>
                    <h3 class="font-black text-xs text-blue-600 mb-2 uppercase tracking-widest italic">Tier 03</h3>
                    <h2 class="text-2xl font-black mb-4 italic uppercase">Premium</h2>
                    <div class="mb-8"><span class="text-4xl font-black">$99</span><span class="text-xs text-slate-400">/mo</span></div>
                    <ul class="text-[11px] font-bold text-slate-500 space-y-4 mb-8 text-left uppercase italic leading-loose">
                        <li>✓ 1,050 attempts/mo</li>
                        <li>✓ 5% success fee</li>
                        <li>✓ Advanced Analytics</li>
                        <li>✓ Priority AI Tasks</li>
                    </ul>
                </div>
                <button onclick="handlePricingAction('premium')" class="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Select Plan</button>
            </div>

            <div class="glass p-8 rounded-[32px] pricing-card">
                <div>
                    <h3 class="font-black text-xs text-blue-600 mb-2 uppercase tracking-widest italic">Tier 04</h3>
                    <h2 class="text-2xl font-black mb-4 italic uppercase">Enterprise</h2>
                    <div class="mb-8"><span class="text-4xl font-black">$299</span><span class="text-xs text-slate-400">/mo</span></div>
                    <ul class="text-[11px] font-bold text-slate-500 space-y-4 mb-8 text-left uppercase italic leading-loose">
                        <li>✓ 3,550 attempts/mo</li>
                        <li>✓ 5% success fee</li>
                        <li>✓ Dedicated Account Mgr</li>
                        <li>✓ Custom AI Training</li>
                    </ul>
                </div>
                <button onclick="handlePricingAction('enterprise')" class="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Select Plan</button>
            </div>

            <div class="glass p-8 rounded-[32px] pricing-card">
                <div>
                    <h3 class="font-black text-xs text-blue-600 mb-2 uppercase tracking-widest italic">Tier 05</h3>
                    <h2 class="text-2xl font-black mb-4 italic uppercase">Custom</h2>
                    <div class="mb-8"><span class="text-xl font-black italic uppercase text-slate-400">Contact Us</span></div>
                    <ul class="text-[11px] font-bold text-slate-500 space-y-4 mb-8 text-left uppercase italic leading-loose">
                        <li>✓ Unlimited attempts</li>
                        <li>✓ Custom SLA Agreements</li>
                        <li>✓ Dedicated Instance</li>
                        <li>✓ On-premise Options</li>
                    </ul>
                </div>
                <a href="mailto:support@rrlabs.online" class="w-full py-4 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-center italic">Email Sales</a>
            </div>

        </div>
    </section>

    <footer class="bg-white border-t border-slate-100 pt-24 pb-12 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div class="col-span-1">
                <div class="flex items-center gap-3 mb-6">
                    <img src="logo.png" class="h-10 w-10 rounded-lg object-contain">
                    <span class="font-black text-xl tracking-tighter italic uppercase">REVENUE RECOVERY LABS</span>
                </div>
                <p class="text-[11px] font-bold text-slate-500 leading-relaxed uppercase italic">AI-Driven Revenue Recovery for high-growth SaaS and E-commerce. Powered by Gemini Pro.</p>
                <div class="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Partner</p>
                    <p class="text-[10px] font-bold text-slate-700 uppercase italic">Merchant of Record: <span class="text-blue-600">Lemon Squeezy</span></p>
                </div>
            </div>

            <div>
                <h4 class="font-black text-[10px] text-blue-600 uppercase tracking-[0.2em] mb-8 italic underline decoration-blue-100 underline-offset-8">Legal</h4>
                <ul class="space-y-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <li><a href="privacy.html" class="hover:text-blue-600 transition">Privacy Policy</a></li>
                    <li><a href="terms.html" class="hover:text-blue-600 transition">Terms of Service</a></li>
                    <li><a href="refund.html" class="hover:text-blue-600 transition">Refund Policy</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-black text-[10px] text-blue-600 uppercase tracking-[0.2em] mb-8 italic underline decoration-blue-100 underline-offset-8">Support</h4>
                <ul class="space-y-4 text-[11px] font-bold text-slate-900 uppercase italic">
                    <li>+880 1557-749217</li>
                    <li class="lowercase"><a href="mailto:support@rrlabs.online" class="text-blue-600">support@rrlabs.online</a></li>
                    <li><a href="https://wa.me/8801557749217" class="text-green-600">WhatsApp Chat →</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-black text-[10px] text-blue-600 uppercase tracking-[0.2em] mb-8 italic underline decoration-blue-100 underline-offset-8">Headquarters</h4>
                <p class="text-[10px] font-bold text-slate-500 uppercase italic leading-loose">
                    60, Chowhaddi, Dotto Kendua-7901<br>
                    Madaripur Sadar, Madaripur<br>
                    Dhaka, Bangladesh
                </p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">© 2026 RRLabs. All Rights Reserved.</p>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Crafted with ❤️ by Palash Sarker</p>
        </div>
    </footer>

    <script>
        let isLoggedIn = false; 

        function handlePricingAction(plan = 'none') {
            if (!isLoggedIn) {
                alert("Boss, please login to your account first!");
                isLoggedIn = true; // For simulation
                updateNav();
            } else {
                window.location.href = 'billing.html';
            }
        }

        function updateNav() {
            const authBtn = document.getElementById('auth-buttons');
            authBtn.innerHTML = isLoggedIn ? 
                `<a href="dashboard.html" class="bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase italic">Dashboard</a>` :
                `<button onclick="isLoggedIn=true; updateNav()" class="text-xs font-black uppercase tracking-widest text-slate-500">Login</button>`;
        }

        window.onload = updateNav;
    </script>
</body>
</html>
