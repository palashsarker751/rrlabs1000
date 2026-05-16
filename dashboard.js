/**
 * Revenue Recovery Labs - Executive Dashboard Engine
 * Architect: Palash Sarker
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

let mainChart = null;

// ১. ড্যাশবোর্ড ইনিশিয়েট করা
function initDashboard() {
    renderSidebarMenu();
    
    // মেইন সাবস্ক্রিপশন কার্ডের ডেটা আপডেট
    updateClientStatus({
        package: "Premium Pro",
        nextPaymentDate: "June 01, 2026",
        amount: "$99.00"
    });

    // স্ট্যাটাস গ্রিড রেন্ডার (Net Recovered, AI Win Rate, etc.)
    renderStats("$8,420.50");

    // পে-আউট ক্যালকুলেশন আপডেট
    updatePayoutIntelligence(8420.50);

    // রিসেন্ট ইন্টারভেনশন (Recent Interventions) লোড করা
    loadRecentInterventions();

    // মেইন চার্ট রেন্ডার করা
    renderMainChart([450, 1200, 800, 1900, 1400, 2500, 2100]);

    // ডিফল্ট ডেট সেট করা
    document.getElementById('filterDate').valueAsDate = new Date();

    // সিঙ্ক বাটনে ক্লিক করলে ডেটা রিফ্রেশ লজিক
    document.getElementById('filterBtn').addEventListener('click', applySync);
}

// ২. সাবস্ক্রিপশন কার্ড আপডেট করার ফাংশন
function updateClientStatus(data) {
    document.getElementById('display-package').innerText = data.package;
    document.getElementById('display-next-date').innerText = data.nextPaymentDate;
    document.getElementById('display-amount').innerText = data.amount;
}

// ৩. সাইডবার মেনু জেনারেট করা
function renderSidebarMenu() {
    const menuItems = [
        { name: 'Dashboard', path: 'dashboard.html', active: true },
        { name: 'Analytics', path: 'analytics.html' },
        { name: 'Records', path: 'records.html' },
        { name: 'Setup', path: 'setup.html' }
    ];
    
    document.getElementById('sidebar-menu').innerHTML = menuItems.map(i => `
        <a href="${i.path}" class="sidebar-link flex items-center gap-3 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 rounded-2xl transition italic ${i.active ? 'active' : ''}">
            ${i.name}
        </a>
    `).join('');
}

// ৪. স্ট্যাটাস গ্রিড রেন্ডার করা
function renderStats(recovered) {
    const stats = [
        { label: "Net Recovered", value: recovered, trend: "Live Sync", color: "text-blue-600" },
        { label: "AI Win Rate", value: "94.8%", trend: "Optimized", color: "text-slate-900" },
        { label: "Active Nodes", value: "32", trend: "Running", color: "text-slate-900" },
        { label: "System ROI", value: "32.4x", trend: "Stable", color: "text-green-600" }
    ];

    document.getElementById('stat-grid').innerHTML = stats.map(s => `
        <div class="stat-card p-8">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">${s.label}</p>
            <h2 class="text-3xl font-black ${s.color} tracking-tighter italic">${s.value}</h2>
            <p class="text-[8px] font-black text-blue-500 mt-2 uppercase tracking-widest italic">${s.trend}</p>
        </div>
    `).join('');
}

// ৫. পে-আউট ইন্টেলিজেন্স ক্যালকুলেশন
function updatePayoutIntelligence(totalRecovered) {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    
    // ধরুন আপনার ফি ২০%, তাহলে ক্লায়েন্ট পাবে ৮০%
    const payoutAmount = (totalRecovered * 0.80).toFixed(2);
    
    document.getElementById('payout-amount').innerText = "$" + Number(payoutAmount).toLocaleString();
    document.getElementById('payout-date').innerText = nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // থ্রেশহোল্ড প্রগ্রেস বার (মাসের কতদিন পার হয়েছে তার ওপর ভিত্তি করে)
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const progress = (today.getDate() / daysInMonth) * 100;
    
    setTimeout(() => {
        document.getElementById('payout-bar').style.width = progress + "%";
        document.getElementById('payout-progress-text').innerText = Math.round(progress) + "%";
    }, 500);
}

// ৬. রিসেন্ট ইন্টারভেনশন লিস্ট
function loadRecentInterventions() {
    const activities = [
        { project: "KitchenOS", amount: "+$299", status: "Recovered", channel: "WhatsApp" },
        { project: "CloudApper", amount: "+$89", status: "In-Progress", channel: "Email" },
        { project: "PayFix", amount: "+$1,200", status: "Recovered", channel: "AI Call" }
    ];

    document.getElementById('transaction-list').innerHTML = activities.map(a => `
        <div class="p-6 bg-slate-50/50 rounded-[30px] border border-slate-100 hover:bg-white hover:border-blue-100 transition-all group">
            <div class="flex justify-between items-start mb-4">
                <span class="text-[10px] font-black text-slate-900 uppercase italic">${a.project}</span>
                <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">${a.channel}</span>
            </div>
            <div class="flex items-end justify-between">
                <h4 class="text-xl font-black text-blue-600 italic">${a.amount}</h4>
                <span class="text-[8px] font-black px-2 py-1 bg-white rounded-lg border border-slate-100 uppercase text-slate-400 group-hover:text-blue-600">${a.status}</span>
            </div>
        </div>
    `).join('');
}

// ৭. মেইন চার্ট (Revenue Velocity)
function renderMainChart(dataPoints) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (mainChart) mainChart.destroy();

    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                data: dataPoints,
                borderColor: '#2563EB',
                borderWidth: 4,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: (context) => {
                    const g = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    g.addColorStop(0, 'rgba(37, 99, 235, 0.1)');
                    g.addColorStop(1, 'rgba(37, 99, 235, 0)');
                    return g;
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#f1f5f9' }, border: { display: false }, ticks: { font: { weight: 'bold', size: 9 }, color: '#94a3b8' } },
                x: { grid: { display: false }, border: { display: false }, ticks: { font: { weight: 'bold', size: 9 }, color: '#94a3b8' } }
            }
        }
    });
}

// ৮. সিঙ্ক বাটন ফাংশন
function applySync() {
    const btn = document.getElementById('filterBtn');
    btn.innerText = "SYNCING...";
    btn.disabled = true;

    setTimeout(() => {
        const randomData = Array.from({length: 7}, () => Math.floor(Math.random() * 3000));
        renderMainChart(randomData);
        renderStats("$" + (Math.random() * 10000).toFixed(2));
        
        btn.innerText = "SYNC";
        btn.disabled = false;
        document.getElementById('chartLabel').innerText = "Refreshed: " + new Date().toLocaleTimeString();
    }, 1000);
}

// ৯. সেশন টার্মিনেট
function terminateSession() {
    if(confirm("Confirm system protocol termination?")) {
        window.location.href = 'offline.html';
    }
}
