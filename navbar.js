/**
 * RRLabs Navbar Engine v2.0
 * Architected by Palash Sarker for Revenue Recovery Labs
 */

const NAV_MENU = {
    public: [
        { name: 'Solutions', path: 'index.html#features' },
        { name: 'Insights', path: 'blog.html' },
        { name: 'Company', path: 'about.html' },
        { name: 'Documentation', path: 'api-docs.html' }
    ],
    private: [
        { name: 'Dashboard', path: 'dashboard.html' },
        { name: 'Setup AI', path: 'setup.html' },
        { name: 'Recovery Logs', path: 'records.html' },
        { name: 'Fintech Hub', path: 'admin.html' },
        { name: 'Billing', path: 'billing.html' }
    ]
};

const RRLabsNav = {
    init() {
        this.renderUI();
        this.initScrollEffect();
        this.initMobileToggle();
        this.listenToAuthChanges();
    },

    async renderUI() {
        const linkBox = document.getElementById('nav-links');
        const authBox = document.getElementById('nav-auth');
        const mobileBox = document.getElementById('mobile-menu');

        if (!linkBox || !authBox || !mobileBox) return;

        // Fetch session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const isLoggedIn = !!session;

        // 1. Build Desktop Navigation Links
        const activeLinks = isLoggedIn ? NAV_MENU.private : NAV_MENU.public;
        linkBox.innerHTML = activeLinks.map(item => `
            <a href="${item.path}" class="hover:text-blue-600 transition-all duration-300 italic group flex items-center gap-1">
                <span class="opacity-0 group-hover:opacity-100 transition-opacity">/</span>
                ${item.name}
            </a>
        `).join('');

        // 2. Build Mobile Menu (Hybrid View)
        // মোবাইলে প্রাইভেট লিঙ্কের পাশাপাশি লিগ্যাল লিঙ্কগুলোও রাখা হয়েছে
        const mobileLinks = [...activeLinks];
        if (isLoggedIn) mobileLinks.push({ name: 'Account Settings', path: 'settings.html' });
        
        mobileBox.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                ${mobileLinks.map(item => `
                    <a href="${item.path}" class="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all italic">
                        ${item.name}
                    </a>
                `).join('')}
            </div>
            ${!isLoggedIn ? `
                <a href="auth.html" class="w-full py-4 bg-blue-600 text-white text-center rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic shadow-xl shadow-blue-500/20">Initialize Access</a>
            ` : `
                <button onclick="RRLabsNav.handleLogout()" class="w-full py-4 bg-slate-900 text-white text-center rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic">Deactivate Session</button>
            `}
        `;

        // 3. Build Auth Action Buttons (Desktop)
        if (isLoggedIn) {
            authBox.innerHTML = `
                <div class="flex items-center gap-3">
                    <a href="settings.html" class="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-slate-100" title="Settings">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </a>
                    <button onclick="RRLabsNav.handleLogout()" class="bg-white border border-slate-200 text-slate-900 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 italic">
                        Logout
                    </button>
                </div>
            `;
        } else {
            authBox.innerHTML = `
                <a href="auth.html" class="hidden sm:block text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition italic">Member Login</a>
                <a href="auth.html" class="bg-blue-600 text-white px-7 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg shadow-blue-500/20 italic">
                    Start Recovery →
                </a>
            `;
        }
    },

    initScrollEffect() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        const innerContainer = nav.querySelector('div');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.style.top = '14px';
                innerContainer.classList.replace('rounded-3xl', 'rounded-[24px]');
                innerContainer.classList.replace('py-4', 'py-3');
                innerContainer.classList.add('bg-white/95', 'shadow-2xl', 'border-blue-100/50');
            } else {
                nav.style.top = '24px';
                innerContainer.classList.replace('rounded-[24px]', 'rounded-3xl');
                innerContainer.classList.replace('py-3', 'py-4');
                innerContainer.classList.remove('bg-white/95', 'shadow-2xl', 'border-blue-100/50');
            }
        });
    },

    initMobileToggle() {
        const btn = document.getElementById('mobile-toggle');
        const menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
            
            // Toggle Animation
            btn.classList.toggle('rotate-90');
        });

        document.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            btn.classList.remove('rotate-90');
        });
    },

    listenToAuthChanges() {
        if (typeof supabase !== 'undefined') {
            supabase.auth.onAuthStateChange(() => {
                this.renderUI();
            });
        }
    },

    async handleLogout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            localStorage.clear(); // Clear any local leftovers
            window.location.href = 'index.html';
        } catch (err) {
            console.error('Logout failed:', err.message);
            window.location.href = 'index.html';
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => RRLabsNav.init());
