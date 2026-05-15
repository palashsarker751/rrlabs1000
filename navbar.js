/**
 * RRLabs Navbar Engine
 * Logic for Dynamic Links, Auth State, and Scroll Effects
 */

const NAV_MENU = {
    public: [
        { name: 'Features', path: 'index.html#features' },
        { name: 'Insights', path: 'blog.html' },
        { name: 'About', path: 'about.html' },
        { name: 'Contact', path: 'contact.html' }
    ],
    private: [
        { name: 'Founder Hub', path: 'admin.html' },
        { name: 'Recovery Logs', path: 'recovery.html' },
        { name: 'API Docs', path: 'api-docs.html' },
        { name: 'Settings', path: 'settings.html' }
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

        // Fetch session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const isLoggedIn = !!session;

        // Build Navigation Links
        const activeLinks = isLoggedIn ? NAV_MENU.private : NAV_MENU.public;
        const linkHTML = activeLinks.map(item => `
            <a href="${item.path}" class="hover:text-blue-600 transition-colors duration-200">${item.name}</a>
        `).join('');

        linkBox.innerHTML = linkHTML;
        mobileBox.innerHTML = linkHTML;

        // Build Auth Buttons
        if (isLoggedIn) {
            authBox.innerHTML = `
                <button onclick="RRLabsNav.handleLogout()" class="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition shadow-lg transition-all duration-300">
                    Logout
                </button>
            `;
        } else {
            authBox.innerHTML = `
                <a href="login.html" class="hidden sm:block text-slate-600 text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition">Login</a>
                <a href="contact.html" class="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[11px] font-black hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">Sign Up</a>
            `;
        }
    },

    initScrollEffect() {
        const nav = document.getElementById('main-nav');
        const innerContainer = nav.querySelector('div');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.style.top = '12px';
                innerContainer.classList.replace('rounded-3xl', 'rounded-2xl');
                innerContainer.classList.replace('py-4', 'py-3');
                innerContainer.classList.add('shadow-xl', 'border-slate-300/50');
            } else {
                nav.style.top = '24px';
                innerContainer.classList.replace('rounded-2xl', 'rounded-3xl');
                innerContainer.classList.replace('py-3', 'py-4');
                innerContainer.classList.remove('shadow-xl', 'border-slate-300/50');
            }
        });
    },

    initMobileToggle() {
        const btn = document.getElementById('mobile-toggle');
        const menu = document.getElementById('mobile-menu');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });

        // Close menu on outside click
        document.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    },

    listenToAuthChanges() {
        supabase.auth.onAuthStateChange(() => {
            this.renderUI();
        });
    },

    async handleLogout() {
        await supabase.auth.signOut();
        window.location.href = 'index.html';
    }
};

// Start Navigation
document.addEventListener('DOMContentLoaded', () => RRLabsNav.init());
