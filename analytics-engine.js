/**
 * RRLABS ANALYTICS ENGINE - FULL FILTER SYNC
 * Logic: Palash Sarker
 */
let growthChart;

document.addEventListener('DOMContentLoaded', () => {
    // ডিফল্ট ডেট সেট (আজ থেকে ৩০ দিন আগে)
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);
    
    document.getElementById('end-date').value = today.toISOString().split('T')[0];
    document.getElementById('start-date').value = lastMonth.toISOString().split('T')[0];

    updateAnalytics(30); 
    initListeners();
});

function initListeners() {
    // কুইক বাটন ক্লিক
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const days = parseInt(btn.getAttribute('data-range'));
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
                b.classList.add('text-slate-400');
            });
            btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg');
            updateAnalytics(days);
        });
    });

    // কাস্টম ডেট ক্যালকুলেশন
    document.getElementById('apply-filter').addEventListener('click', () => {
        const start = new Date(document.getElementById('start-date').value);
        const end = new Date(document.getElementById('end-date').value);
        if (start > end) return alert("Error: Start Date > End Date");

        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
        updateAnalytics(diffDays);
    });
}

function updateAnalytics(days) {
    const data = generateDemoData(days);
    
    // ১. আপডেট মেট্রিক্স
    document.getElementById('metric-time').innerText = (3.5 + Math.random()).toFixed(1) + "h";
    document.getElementById('metric-efficiency').innerText = (90 + Math.random() * 8).toFixed(1) + "%";
    document.getElementById('metric-open-rate').innerText = (75 + Math.random() * 15).toFixed(1) + "%";

    // ২. আপডেট চার্ট
    renderChart(data.labels, data.recovered, data.abandoned);

    // ৩. আপডেট ফানেল
    document.getElementById('funnel-container').innerHTML = data.funnel.map(s => `
        <div class="bg-blue-600 ${s.w} p-4 rounded-xl flex justify-between items-center font-black italic text-[10px] uppercase text-white shadow-lg">
            <span>${s.label}</span><span>${s.p}</span>
        </div>
    `).join('');

    // ৪. আপডেট টেবিল
    document.getElementById('channel-stats-body').innerHTML = data.channels.map(c => `
        <tr class="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
            <td class="px-8 py-5 font-bold">${c.name}</td>
            <td class="px-8 py-5 text-slate-400">${c.vol}</td>
            <td class="px-8 py-5 font-black">$${(c.val * days).toLocaleString()}</td>
            <td class="px-8 py-5 text-blue-400">${c.cr}</td>
            <td class="px-8 py-5 text-right text-green-500 font-black">↑ 4.2%</td>
        </tr>
    `).join('');
}

function generateDemoData(days) {
    const labels = Array.from({length: 6}, (_, i) => `P-${i+1}`);
    return {
        labels: labels,
        recovered: labels.map(() => Math.floor(Math.random() * 4000) + 1000),
        abandoned: labels.map(() => Math.floor(Math.random() * 6000) + 2000),
        funnel: [
            { label: "Abandoned", w: "w-full", p: "100%" },
            { label: "AI Processed", w: "w-[82%]", p: "82%" },
            { label: "Recovered", w: "w-[24%]", p: "24%" }
        ],
        channels: [
            { name: "WhatsApp", vol: 15 * days, val: 240, cr: "32%" },
            { name: "Email", vol: 10 * days, val: 110, cr: "14%" }
        ]
    };
}

function renderChart(labels, rec, abd) {
    const ctx = document.getElementById('growthChart').getContext('2d');
    if (growthChart) growthChart.destroy();
    growthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Recovered', data: rec, backgroundColor: '#3b82f6', borderRadius: 8 },
                { label: 'Abandoned', data: abd, backgroundColor: '#334155', borderRadius: 8 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#1e293b' }, ticks: { color: '#64748b', font: { size: 9 } } },
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 9 } } }
            }
        }
    });
}
