/**
 * RRLabs Supabase Architecture - v2.0
 * High-Precision Engine for Auth, Database & AI Prediction Streams
 * Architected by Palash Sarker
 */

// 1. Core Configuration (Environment Simulation)
const SUPABASE_CONFIG = {
    URL: 'https://your-project-id.supabase.co', // Replace with your Production URL
    KEY: 'your-anon-key' // Replace with your Production Anon Key
};

// 2. Initialize Core Client
if (typeof supabase === 'undefined') {
    console.error('Supabase CDN not detected. Please ensure the script is loaded.');
}
const _supabase = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);

/**
 * RRLabs Auth Protocol
 * Handles session integrity and founder-level access.
 */
const RRLabsAuth = {
    // Session Retrieval
    async getSession() {
        const { data: { session }, error } = await _supabase.auth.getSession();
        if (error) {
            this.handleError('Session Retrieval', error);
            return null;
        }
        return session;
    },

    // Secure Logout
    async terminateSession() {
        const { error } = await _supabase.auth.signOut();
        if (!error) {
            localStorage.clear();
            window.location.href = 'index.html';
        }
    },

    // Check if user is active
    async protectRoute() {
        const session = await this.getSession();
        if (!session) {
            window.location.href = 'auth.html';
        }
        return session;
    },

    handleError(context, error) {
        console.error(`[RRLabs Auth] ${context} Failure:`, error.message);
    }
};

/**
 * RRLabs Database & AI Data Streams
 * Optimized for Recovery Records and Revenue Prediction
 */
const RRLabsDB = {
    // 1. Fetch Recovery Records with AI Metadata
    async getRecoveryRecords(limit = 50) {
        const { data, error } = await _supabase
            .from('recovery_logs')
            .select(`
                id,
                customer_name,
                customer_email,
                amount,
                currency,
                status,
                gateway,
                ai_prediction_score,
                ai_last_message,
                created_at
            `)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) return this.handleDBError('Records Fetch', error);
        return data;
    },

    // 2. Real-time Recovery Stream (For Dashboard Live Updates)
    subscribeToLiveRecoveries(callback) {
        return _supabase
            .channel('live_recoveries')
            .on('postgres_changes', { 
                event: 'INSERT', 
                schema: 'public', 
                table: 'recovery_logs' 
            }, payload => {
                console.log('[RRLabs Sentinel] New Recovery Detected:', payload.new);
                if (callback) callback(payload.new);
            })
            .subscribe();
    },

    // 3. Update Merchant Settings (Setup Page Logic)
    async updateMerchantConfig(merchantId, configData) {
        const { data, error } = await _supabase
            .from('merchants')
            .update(configData)
            .eq('id', merchantId);

        if (error) return this.handleDBError('Config Update', error);
        return data;
    },

    handleDBError(context, error) {
        console.error(`[RRLabs DB] ${context} Error:`, error.message);
        return [];
    }
};

// Expose to Global Scope for all 19 pages
window.supabase = _supabase;
window.RRLabsAuth = RRLabsAuth;
window.RRLabsDB = RRLabsDB;

console.log('%c RRLabs Core: Supabase Architecture Initialized. Status: [SECURED] ', 'background: #2563eb; color: #fff; font-weight: 900; font-style: italic;');
