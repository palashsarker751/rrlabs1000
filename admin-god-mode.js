/**
 * RRLABS - MASTER ADMIN & GOD MODE ENGINE
 * Architect: Palash Sarker
 */

document.addEventListener('DOMContentLoaded', () => {
    // ১. সব ফাংশন চালু করা
    initGlobalAnalytics();
    loadMerchantData();
    fetchBlogPosts();
    setupFormHandlers();
});

// --- ১. রেভিনিউ অ্যানালিটিক্স চার্ট ---
function initGlobalAnalytics() {
    const ctx = document.getElementById('godAnalyticsChart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue Growth',
                data: [42000, 55000, 48000, 72000, 68000, 89000, 95000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } }
            }
        }
    });
}

// --- ২. মার্চেন্ট লিস্ট (Client Management) ---
function loadMerchantData() {
    const list = document.getElementById('merchant-list');
    // আপনার প্রজেক্ট অনুযায়ী এখানে ডেটাবেস থেকে ডেটা আনতে পারেন
    const merchants = [
        { name: "KitchenOS UAE", package: "Enterprise", status: "Active" },
        { name: "CloudApper", package: "Premium Pro", status: "Active" },
        { name: "Revenue Recovery Labs", package: "Owner Mode", status: "Active" },
        { name: "PayFix Online", package: "Starter", status: "Paused" }
    ];

    list.innerHTML = merchants.map(m => `
        <tr class="hover:bg-slate-800/40 transition border-b border-slate-800/50">
            <td class="px-8 py-5 text-white uppercase tracking-tight font-black">${m.name}</td>
            <td class="px-8 py-5 text-slate-400 italic">${m.package}</td>
            <td class="px-8 py-5">
                <span class="px-3 py-1 ${m.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} rounded-full text-[8px] uppercase font-black tracking-widest">
                    ${m.status}
                </span>
            </td>
            <td class="px-8 py-5 text-right">
                <button onclick="pushSystemLog('Override initiated for ${m.name}')" class="text-blue-500 hover:underline text-[9px] uppercase font-black mr-4">Manage</button>
            </td>
        </tr>
    `).join('');
}

// --- ৩. ব্লগ পাবলিশ লজিক (Supabase Integration) ---
function setupFormHandlers() {
    const blogForm = document.getElementById('blog-form');
    if (!blogForm) return;

    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.innerText = "DEPLOYING CONTENT...";
        btn.disabled = true;

        const postData = {
            title: document.getElementById('post-title').value,
            category: document.getElementById('post-category').value,
            excerpt: document.getElementById('post-excerpt').value,
            content: document.getElementById('post-content').value,
            created_at: new Date()
        };

        try {
            const { error } = await supabase.from('blog_posts').insert([postData]);
            if (error) throw error;

            pushSystemLog(`SUCCESS: "${postData.title}" published to main site.`);
            alert("Post Successfully Deployed!");
            blogForm.reset();
            fetchBlogPosts(); // লিস্ট আপডেট
        } catch (err) {
            pushSystemLog(`CRITICAL ERROR: Deployment failed - ${err.message}`);
            alert("Error: " + err.message);
        } finally {
            btn.innerHTML = "Publish to RRLabs Blog <span>→</span>";
            btn.disabled = false;
        }
    });
}

// --- ৪. পাবলিশড কন্টেন্ট ফেচ করা ---
async function fetchBlogPosts() {
    const listContainer = document.getElementById('admin-posts-list');
    if (!listContainer) return;

    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('id, title, category, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        pushSystemLog("ERROR: Could not sync blog records.");
        return;
    }

    listContainer.innerHTML = posts.map(post => `
        <tr class="hover:bg-slate-800/40 transition">
            <td class="px-8 py-5 text-slate-300 font-bold uppercase tracking-tight">${post.title}</td>
            <td class="px-8 py-5">
                <span class="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[8px] uppercase font-black tracking-widest">${post.category}</span>
            </td>
            <td class="px-8 py-5 text-slate-500 italic">${new Date(post.created_at).toLocaleDateString()}</td>
            <td class="px-8 py-5 text-right">
                <button onclick="deletePost('${post.id}', '${post.title}')" class="text-red-500 hover:underline uppercase text-[9px] font-black">Terminate</button>
            </td>
        </tr>
    `).join('');
}

// --- ৫. লাইভ সিস্টেম লগস ---
function pushSystemLog(message) {
    const logBox = document.getElementById('system-logs');
    if (!logBox) return;

    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('p');
    entry.innerHTML = `> [${time}] ${message}`;
    logBox.prepend(entry);

    // ১০টির বেশি লগ হলে পুরনোটা সরানো
    if (logBox.children.length > 15) logBox.removeChild(logBox.lastChild);
}

// --- ৬. মেইনটেন্যান্স মোড টগল ---
function toggleMaintenance() {
    const btn = document.getElementById('maint-btn');
    const isActive = btn.classList.contains('bg-red-600');

    if (confirm(isActive ? "Put system into Maintenance Mode?" : "Restore System Online?")) {
        if (isActive) {
            btn.classList.replace('bg-red-600', 'bg-green-600');
            btn.innerText = "Maintenance: ON";
            pushSystemLog("GLOBAL OVERRIDE: Maintenance Mode Activated.");
        } else {
            btn.classList.replace('bg-green-600', 'bg-red-600');
            btn.innerText = "Maintenance: OFF";
            pushSystemLog("SYSTEM STATUS: Live & Operational.");
        }
    }
}

// --- ৭. ব্লগ ডিলিট লজিক ---
async function deletePost(id, title) {
    if (confirm(`Confirm permanent deletion of "${title}"?`)) {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (!error) {
            pushSystemLog(`REMOVED: Article ID ${id} deleted.`);
            fetchBlogPosts();
        } else {
            pushSystemLog(`ERROR: Failed to delete record.`);
        }
    }
}
