/**
 * Revenue Recovery Labs - Logic Engine
 * Roles: 'public', 'client', 'admin'
 */

let currentUser = {
    role: localStorage.getItem('user_role') || 'public',
    name: 'Boss'
};

function renderView() {
    const role = currentUser.role;
    
    // ১. সব ডাইনামিক রোল এলিমেন্ট হাইড করো
    document.querySelectorAll('[data-role]').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    // ২. বর্তমান রোল অনুযায়ী এলিমেন্ট দেখাও
    if (role === 'public') {
        document.querySelectorAll('[data-role="public"]').forEach(el => el.style.display = 'block');
    } 
    
    if (role === 'client' || role === 'admin') {
        document.querySelectorAll('[data-role="private"]').forEach(el => el.style.display = 'block');
        const nameDisplay = document.getElementById('user-name-display');
        if (nameDisplay) nameDisplay.innerText = currentUser.name;
    }

    if (role === 'admin') {
        document.querySelectorAll('[data-role="admin"]').forEach(el => el.style.display = 'block');
        // Admin Borders for pricing
        document.querySelectorAll('.pricing-card').forEach(el => el.classList.add('admin-border'));
    } else {
        document.querySelectorAll('.pricing-card').forEach(el => el.classList.remove('admin-border'));
    }

    updateNav();
}

function loginAs(role) {
    currentUser.role = role;
    currentUser.name = (role === 'admin') ? 'Palash (Admin)' : 'Sarker Client';
    localStorage.setItem('user_role', role);
    renderView();
}

function logout() {
    currentUser.role = 'public';
    localStorage.removeItem('user_role');
    renderView();
}

function updateNav() {
    const authBtn = document.getElementById('auth-buttons');
    if (!authBtn) return;

    if (currentUser.role === 'public') {
        authBtn.innerHTML = `
            <button onclick="loginAs('admin')" class="text-xs font-black uppercase text-slate-400 hover:text-blue-600 transition tracking-tighter italic mr-2">Login</button>
            <button onclick="loginAs('client')" class="bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase italic">Get Started</button>
        `;
    } else {
        authBtn.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded italic">${currentUser.role}</span>
                <button onclick="logout()" class="bg-slate-900 text-white px-5 py-2 rounded-xl font-black text-[10px] uppercase italic">Logout</button>
            </div>
        `;
    }
}

function handlePricingAction(plan) {
    if (currentUser.role === 'public') {
        alert("Boss, please login first!");
        loginAs('client');
    } else {
        window.location.href = 'billing.html?plan=' + plan;
    }
}

// Initial Run
document.addEventListener('DOMContentLoaded', renderView);
