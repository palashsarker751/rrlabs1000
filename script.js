/**
 * Revenue Recovery Labs - System Logic Engine
 * All Necessary Logic for Multi-Tenant Support & Roles
 */

// 1. System State
const state = {
    user: {
        role: localStorage.getItem('rrlabs_session_role') || 'public',
        name: 'Palash Sarker',
        project: 'Revenue Recovery Labs'
    }
};

// 2. Main Render Function
function updateSystemUI() {
    const role = state.user.role;
    
    // Hide all role-based elements first
    document.querySelectorAll('[data-role]').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    // Show elements based on current role
    if (role === 'public') {
        document.querySelectorAll('[data-role="public"]').forEach(el => {
            el.style.display = 'block';
        });
    }

    if (role === 'client' || role === 'admin') {
        document.querySelectorAll('[data-role="private"]').forEach(el => {
            el.style.display = 'block';
        });
        
        // Update Dynamic UI Labels
        const nameLabel = document.getElementById('user-name-display');
        if (nameLabel) nameLabel.innerText = role === 'admin' ? "Chief Architect" : state.user.name;
    }

    if (role === 'admin') {
        document.querySelectorAll('[data-role="admin"]').forEach(el => {
            el.style.display = 'block';
        });
        
        // Add visual cues for Admin (God Mode)
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.add('admin-border');
        });
    } else {
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.remove('admin-border');
        });
    }

    renderAuthButtons();
}

// 3. Authentication & Role Switching
window.loginAs = function(role) {
    console.log(`System: Switching to ${role} mode...`);
    state.user.role = role;
    localStorage.setItem('rrlabs_session_role', role);
    updateSystemUI();
};

window.logout = function() {
    state.user.role = 'public';
    localStorage.removeItem('rrlabs_session_role');
    updateSystemUI();
};

// 4. Navigation UI Handler
function renderAuthButtons() {
    const container = document.getElementById('auth-buttons');
    if (!container) return;

    if (state.user.role === 'public') {
        container.innerHTML = `
            <button onclick="loginAs('client')" class="text-xs font-black uppercase text-slate-500 hover:text-blue-600 transition italic">Login</button>
            <button onclick="loginAs('client')" class="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase italic tracking-widest shadow-xl">Get Started</button>
        `;
    } else {
        container.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="flex flex-col items-end hidden md:flex">
                    <span class="text-[9px] font-black uppercase text-blue-600 leading-none">${state.user.role} mode</span>
                    <span class="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">System Active</span>
                </div>
                <button onclick="logout()" class="bg-red-50 text-red-600 border border-red-100 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase italic">Exit Session</button>
            </div>
        `;
    }
}

// 5. Pricing Action Handler
window.handlePricing = function(plan) {
    if (state.user.role === 'public') {
        alert(`Boss, redirecting to login to secure your ${plan} plan!`);
        loginAs('client');
    } else {
        console.log(`Action: Initiating checkout for ${plan} via Lemon Squeezy API...`);
        // Logic for redirecting to your Lemon Squeezy checkout link
        // Example: window.location.href = `https://rrlabs.lemonsqueezy.com/checkout/buy/${planId}`;
    }
};

// 6. Bootstrap System
document.addEventListener('DOMContentLoaded', () => {
    updateSystemUI();
    
    // Add smooth scroll for pricing link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
