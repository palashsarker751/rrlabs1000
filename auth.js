const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');
const toggleAuthBtn = document.getElementById('toggle-auth');
const googleAuthBtn = document.getElementById('google-auth-btn');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginBtn = document.getElementById('back-to-login');
const passwordGroup = document.getElementById('password-group');

let authMode = 'login'; // 'login', 'signup', 'forgot'

// --- UI Toggle Logic ---
const updateUI = () => {
    if (authMode === 'login') {
        authTitle.innerText = "Welcome Back";
        authSubtitle.innerText = "Log in to manage your revenue recovery.";
        submitBtn.innerText = "Sign In";
        passwordGroup.classList.remove('hidden');
        backToLoginBtn.classList.add('hidden');
        document.getElementById('toggle-text').classList.remove('hidden');
    } else if (authMode === 'signup') {
        authTitle.innerText = "Create Account";
        authSubtitle.innerText = "Start your 14-day free trial today.";
        submitBtn.innerText = "Get Started";
        passwordGroup.classList.remove('hidden');
        backToLoginBtn.classList.add('hidden');
        document.getElementById('toggle-text').classList.remove('hidden');
    } else if (authMode === 'forgot') {
        authTitle.innerText = "Reset Password";
        authSubtitle.innerText = "Enter your email to receive a reset link.";
        submitBtn.innerText = "Send Reset Link";
        passwordGroup.classList.add('hidden');
        backToLoginBtn.classList.remove('hidden');
        document.getElementById('toggle-text').classList.add('hidden');
    }
};

toggleAuthBtn.addEventListener('click', () => {
    authMode = (authMode === 'login') ? 'signup' : 'login';
    updateUI();
});

forgotPasswordLink.addEventListener('click', () => {
    authMode = 'forgot';
    updateUI();
});

backToLoginBtn.addEventListener('click', () => {
    authMode = 'login';
    updateUI();
});

// --- Supabase Auth Logic ---

// 1. Google Auth
googleAuthBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/dashboard.html' }
    });
    if (error) alert(error.message);
});

// 2. Email/Password Auth
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    try {
        if (authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            window.location.href = 'dashboard.html';
        } 
        else if (authMode === 'signup') {
            const { error } = await supabase.auth.signUp({ 
                email, 
                password,
                options: { data: { full_name: "" } } // metadata adding
            });
            if (error) throw error;
            alert("Check your email for the confirmation link!");
        } 
        else if (authMode === 'forgot') {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html',
            });
            if (error) throw error;
            alert("Password reset link sent to your email.");
        }
    } catch (error) {
        alert(error.message);
    } finally {
        submitBtn.disabled = false;
        updateUI();
    }
});
