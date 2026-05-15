/**
 * RRLabs Supabase Configuration
 * Core engine for Auth, Database, and Gemini AI data streams.
 */

// 1. Initialize Configuration
const SUPABASE_URL = 'https://your-project-id.supabase.co'; // Replace with your URL
const SUPABASE_ANON_KEY = 'your-anon-key'; // Replace with your Anon Key

// 2. Initialize the Supabase Client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Global RRLabs Auth Utilities
 */
const RRLabsAuth = {
    // Check if user is an authenticated founder
    async getSession() {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return data.session;
        } catch (err) {
            console.error('Auth Session Error:', err.message);
            return null;
        }
    },

    // Get current user metadata
    async getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // Global listener for session changes
    onAuthUpdate(callback) {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(`Auth Event: ${event}`);
            if (callback) callback(event, session);
        });
    }
};

/**
 * Global Database Utilities
 */
const RRLabsDB = {
    // Fetch recovery logs for a specific merchant
    async fetchLogs(merchantId) {
        const { data, error } = await supabase
            .from('recovery_logs')
            .select('*')
            .eq('merchant_id', merchantId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('DB Fetch Error:', error.message);
            return [];
        }
        return data;
    }
};

// Export for use in other modules
window.RRLabsAuth = RRLabsAuth;
window.RRLabsDB = RRLabsDB;

console.log('RRLabs Core: Supabase Architecture Initialized.');
