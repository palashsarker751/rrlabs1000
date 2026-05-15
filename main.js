/**
 * RRLabs Global Loader
 * Injects dependencies into all HTML files automatically.
 */
const injectScripts = () => {
    const scripts = [
        'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
        'supabase-config.js',
        'navbar.js'
    ];

    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        s.async = false; // Ensures sequential loading
        document.head.appendChild(s);
    });
};

injectScripts();

// Global Auth Guard: Prevent unauthorized access to private pages
const privatePages = ['admin.html', 'dashboard.html', 'settings.html', 'recovery.html', 'recovery-details.html'];
const currentPage = window.location.pathname.split("/").pop();

if (privatePages.includes(currentPage)) {
    document.addEventListener('DOMContentLoaded', async () => {
        // Wait for Supabase to load from the injected script
        const checkAuth = setInterval(async () => {
            if (window.supabase) {
                clearInterval(checkAuth);
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    window.location.href = 'auth.html'; // Redirect if not logged in
                }
            }
        }, 100);
    });
}
