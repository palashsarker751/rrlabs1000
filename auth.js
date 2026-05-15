// auth.js
const authForm = document.getElementById('auth-form');
let isLoggingIn = false;

document.getElementById('toggle-auth').addEventListener('click', () => {
    isLoggingIn = !isLoggingIn;
    document.getElementById('auth-title').innerText = isLoggingIn ? 'Welcome back' : 'Create your account';
    document.getElementById('auth-subtitle').innerText = isLoggingIn ? 'Log in to your dashboard' : 'Start your 14-day free trial today.';
    document.getElementById('toggle-auth').innerText = isLoggingIn ? "Don't have an account? Sign up" : "Already have an account? Log in";
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLoggingIn) {
        // Supabase Login Logic
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else window.location.href = 'dashboard.html';
    } else {
        // Supabase Signup Logic
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert('Check your email for the confirmation link!');
    }
});
