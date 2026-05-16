document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('recovery-table-body');
    const totalRecoveredEl = document.getElementById('total-recovered-val');

    const fetchRecoveryData = async () => {
        try {
            // আপনার Supabase টেবিল নাম 'recoveries' হলে:
            const { data, error } = await supabase
                .from('recoveries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            renderTable(data);
            calculateMetrics(data);
        } catch (err) {
            console.error("Error:", err.message);
            // ডামি ডাটা যদি ডাটাবেসে কিছু না থাকে (টেস্টিং এর জন্য)
            renderTable([
                { customer_name: 'Rahat Karim', order_id: '8842', value: 149.00, channel: 'WhatsApp', status: 'recovered' },
                { customer_name: 'Sarah Jenkins', order_id: '8839', value: 42.00, channel: 'Email', status: 'pending' }
            ]);
        }
    };

    const renderTable = (items) => {
        tableBody.innerHTML = items.map(item => `
            <tr class="table-row group transition-all">
                <td class="px-8 py-6">
                    <p class="font-bold text-slate-900 group-hover:text-blue-600 transition">${item.customer_name}</p>
                    <p class="text-[10px] font-bold text-slate-400 mt-0.5 tracking-tight">ORDER #${item.order_id}</p>
                </td>
                <td class="px-8 py-6">
                    <span class="text-sm font-black text-slate-700">$${item.value.toFixed(2)}</span>
                </td>
                <td class="px-8 py-6">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full ${item.channel === 'WhatsApp' ? 'bg-green-500' : 'bg-blue-500'}"></div>
                        <span class="text-xs font-bold text-slate-600">${item.channel}</span>
                    </div>
                </td>
                <td class="px-8 py-6">
                    <span class="status-pill status-${item.status}">${item.status === 'recovered' ? 'Recovered' : 'In Progress'}</span>
                </td>
                <td class="px-8 py-6 text-right">
                    <button class="bg-slate-50 text-slate-900 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        View Log
                    </button>
                </td>
            </tr>
        `).join('');
    };

    const calculateMetrics = (items) => {
        const total = items
            .filter(i => i.status === 'recovered')
            .reduce((sum, i) => sum + i.value, 0);
        totalRecoveredEl.innerText = `$${total.toLocaleString()}`;
    };

    fetchRecoveryData();
});
