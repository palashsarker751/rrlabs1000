document.addEventListener('DOMContentLoaded', async () => {
    const ledgerBody = document.getElementById('ledger-body');

    const fetchRecords = async () => {
        try {
            // Supabase 'recovery_records' টেবিল থেকে ডাটা ফেচ
            const { data, error } = await supabase
                .from('recovery_records')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            renderLedger(data);
        } catch (err) {
            console.error("Ledger Error:", err.message);
            // ডামি ডাটা লোড যদি টেবিল এম্পটি থাকে
            renderLedger([
                { name: 'John Doe', email: 'john@example.com', amount: 299.00, status: 'recovered', last_contact: '2 hours ago' },
                { name: 'Sarah Jenkins', email: 'sarah@store.com', amount: 49.00, status: 'pending', last_contact: '15 mins ago' }
            ]);
        }
    };

    const renderLedger = (records) => {
        ledgerBody.innerHTML = records.map(row => `
            <tr class="table-row group transition-all">
                <td class="px-10 py-7">
                    <div class="flex flex-col">
                        <span class="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition">${row.name}</span>
                        <span class="text-[10px] text-slate-400 font-bold tracking-tight">${row.email}</span>
                    </div>
                </td>
                <td class="px-10 py-7">
                    <span class="text-sm font-black text-slate-800">$${row.amount.toFixed(2)}</span>
                </td>
                <td class="px-10 py-7">
                    <span class="badge badge-${row.status === 'recovered' ? 'success' : row.status === 'pending' ? 'pending' : 'failed'}">
                        ${row.status}
                    </span>
                </td>
                <td class="px-10 py-7">
                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">${row.last_contact}</span>
                </td>
                <td class="px-10 py-7 text-right">
                    <a href="recovery-details.html?id=${row.id}" class="inline-flex items-center gap-2 bg-slate-50 text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        Audit Log
                    </a>
                </td>
            </tr>
        `).join('');
    };

    fetchRecords();
});
