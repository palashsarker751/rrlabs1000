/**
 * Revenue Recovery Labs - Core Logic Engine
 * Author: Palash Sarker
 * Roles: 'public', 'client', 'admin'
 */

// ১. ডিফল্ট স্টেট (লোকাল স্টোরেজ থেকে লাস্ট সেশন চেক করবে)
let currentUser = {
    role: localStorage.getItem('rrlabs_role') || 'public',
    name: 'Boss'
};

/**
 * ভিউ কন্ট্রোলার: রোল অনুযায়ী ডোম এলিমেন্ট শো/হাইড করে
 */
function renderView() {
    const role = currentUser.role;
    
    // কনসোলে চেক করার জন্য (ডিবাগিং)
    console.log("Current System Role:", role);

    // ২. সব ডাটা-রোল এলিমেন্ট আগে ডিসপ্লে থেকে সরিয়ে দাও
    const allRoleElements = document.querySelectorAll('[data-role]');
    allRoleElements.forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    // ৩. পাবলিক ভিউ লজিক
    if (role === 'public') {
        document.querySelectorAll('[data-role="public"]').forEach(el => {
            el.style.display = 'block';
        });
    } 
    
    // ৪. ক্লায়েন্ট এবং অ্যাডমিন দুজনেই প্রাইভেট সেকশন দেখবে
    if (role === 'client' || role === 'admin') {
        document.querySelectorAll('[data-role="private"]').forEach(el => {
            el.style.display = 'block';
        });
        
        const nameDisplay = document.getElementById('user-name-display');
        if (nameDisplay) nameDisplay.innerText = currentUser.name;
    }

    // ৫. শুধুমাত্র অ্যাডমিন (God Mode) লজিক
    if (role === 'admin') {
        document.querySelectorAll('[data-role="admin"]').forEach(el => {
            el.style.display = 'block';
        });
        
        // অ্যাডমিন ভিউতে প্রাইসিং কার্ডে স্পেশাল বর্ডার দাও
        document.querySelectorAll('.pricing-card').forEach(el => {
            el.classList.add('admin-border');
        });
    } else {
        document.querySelectorAll('.pricing-card').forEach(el => {
            el.classList.remove('admin-border');
        });
    }

    updateNavigation();
}

/**
 * ন্যাভিগেশন বার আপডেট (লগইন/লগআউট বাটন)
 */
function updateNavigation() {
    const authBtnContainer = document.getElementById('auth-buttons');
    if (!authBtnContainer) return;

    if (currentUser.role === 'public') {
        authBtnContainer.innerHTML = `
            <button onclick="loginAs('admin')" class="text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition tracking-widest mr-4 italic">System Login</button>
            <button onclick="loginAs('client')" class="bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase italic shadow-lg shadow-blue-500/20">Get Started</button>
        `;
    } else {
        authBtnContainer.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-[9px] font-black uppercase bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 italic">${currentUser.role} mode</span>
                <button onclick="logout()" class="bg-slate-900 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase italic">Logout</button>
            </div>
        `;
    }
}

/**
 * রোল পরিবর্তন করার ফাংশন (লগইন সিমুলেশন)
 */
window.loginAs = function(targetRole) {
    currentUser.role = targetRole;
    currentUser.name = (targetRole === 'admin') ? 'Palash (God)' : 'Sarker Client';
    
    // লোকাল স্টোরেজে সেভ করো যেন রিফ্রেশ দিলেও না যায়
    localStorage.setItem('rrlabs_role', targetRole);
    renderView();
};

/**
 * সিস্টেম লগআউট
 */
window.logout = function() {
    currentUser.role = 'public';
    localStorage.removeItem('rrlabs_role');
    renderView();
};

/**
 * প্রাইসিং বাটন লজিক
 */
window.handlePricingAction = function(plan = 'Free') {
    if (currentUser.role === 'public') {
        alert("Boss, please login to select the " + plan + " plan!");
        loginAs('client');
    } else {
        // যদি লগইন থাকে তবে বিলিং পেজে নিয়ে যাও
        console.log("Redirecting to billing for plan:", plan);
        window.location.href = 'billing.html?selected=' + plan;
    }
};

// ৬. পেজ লোড হওয়ার সাথে সাথে ইঞ্জিন রান করো
document.addEventListener('DOMContentLoaded', () => {
    renderView();
});
