document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const caseId = urlParams.get('id');

    if (!caseId) {
        console.error("No ID provided");
        return;
    }

    const loadData = async () => {
        try {
            // Real fetch logic (uncomment when ready)
            // const { data, error } = await supabase.from('recovery_records').select('*').eq('id', caseId).single();
            // if (error) throw error;
            // render(data);

            // Dummy Data for testing
            render({
                name: "John Doe",
                amount: 299.00,
                score: 98,
                logic: "Detecting checkout friction. Applying scarcity-based loyalty logic to bypass 'card_declined' event.",
                logs: [
                    { role: 'ai', msg: "Hey John, I noticed your payment for 'Pro Plan' hit a snag. Want a 10% loyalty discount?", time: "11:20 PM" },
                    { role: 'user', msg: "Can I pay with a different card tomorrow?", time: "11:25 PM" }
                ],
                timeline: [
                    { time: "11:15 PM", event: "Payment Failed", desc: "Reason: card_declined" },
                    { time: "11:20 PM", event: "AI Protocol Engaged", desc: "WhatsApp message dispatched" }
                ]
            });
        } catch (e) { console.error(e); }
    };

    const render = (data) => {
        document.getElementById('customer-name').innerText = data.name;
        document.getElementById('recovered-value').innerText = `$${data.amount.toFixed(2)}`;
        document.getElementById('intent-score').innerText = `${data.score}%`;
        document.getElementById('ai-logic-note').innerText = `"${data.logic}"`;

        // Render Chat
        const chatBox = document.getElementById('chat-logs');
        chatBox.innerHTML = data.logs.map(log => `
            <div class="flex flex-col ${log.role === 'ai' ? 'items-start' : 'items-end'}">
                <div class="${log.role === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'} p-5 text-sm font-bold leading-relaxed italic max-w-md shadow-sm">
                    "${log.msg}"
                </div>
                <span class="text-[8px] font-black text-slate-300 uppercase mt-2 ${log.role === 'ai' ? 'ml-2' : 'mr-2'}">${log.role.toUpperCase()} • ${log.time}</span>
            </div>
        `).join('');

        // Render Timeline
        const timeline = document.getElementById('timeline-container');
        const existingLine = '<div class="absolute left-[19px] top-2 bottom-2 w-[2px] bg-slate-100"></div>';
        timeline.innerHTML = existingLine + data.timeline.map(t => `
            <div class="relative flex gap-8">
                <div class="timeline-dot"></div>
                <div>
                    <p class="text-[9px] font-black text-slate-400 uppercase mb-1">${t.time}</p>
                    <h4 class="text-sm font-black text-slate-900 uppercase">${t.event}</h4>
                    <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">${t.desc}</p>
                </div>
            </div>
        `).join('');
    };

    loadData();
});
