const systemState = {
    role: localStorage.getItem('rrlabs_role') || 'public',
    user: 'Palash Sarker'
};

function render() {
    const role = systemState.role;
    
    // Reset Views
    document.querySelectorAll('[data-role]').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    // Active Role View
    if (role === 'public') {
        document.querySelectorAll('[data-role="public"]').forEach(el => el.style.display = 'block');
    } else {
        document.querySelectorAll('[data-role="private"]').forEach(el => el.style.display = 'block');
        const display = document.getElementById('user-name-display');
        if (display) display.innerText = systemState.user;
    }

    if (role === 'admin') {
        document.querySelectorAll('[data-role="admin"]').forEach(el => el.style.display = 'block');
    }

    renderNav();
}

function renderNav() {
    const container = document.getElementById('auth-buttons');
    if (!container) return;

    if (systemState.role === 'public') {
        container.innerHTML = `<button onclick="loginAs('client')" class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase italic">Login</button>`;
    } else {
        container.innerHTML = `<button onclick="logout()" class="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase italic">Logout</button>`;
    }
}

window.loginAs = (role) => {
    systemState.role = role;
    localStorage.setItem('rrlabs_role', role);
    render();
};

window.logout = () => {
    systemState.role = 'public';
    localStorage.removeItem('rrlabs_role');
    render();
};

window.handlePricing = (plan) => {
    alert(`Initializing Recovery Logic for ${plan} plan... Check Console.`);
    console.log(`Action: Forwarding to Lemon Squeezy for ${plan} Tier.`);
};

document.addEventListener('DOMContentLoaded', render);
