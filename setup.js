document.addEventListener('DOMContentLoaded', () => {
    const gatewayList = document.getElementById('gatewayList');
    const activeLabel = document.getElementById('activeGatewayLabel');
    const activeInput = document.getElementById('active_gateway_input');
    const customField = document.getElementById('customGatewayNameField');

    // World's Top 20 International Payment Gateways + Custom Option
    const gateways = [
        "Stripe", "PayPal", "Lemon Squeezy", "Paddle", "Adyen", 
        "Authorize.net", "Braintree", "Checkout.com", "2Checkout", "Square", 
        "Worldpay", "SagePay", "Mollie", "Razorpay", "Paystack", 
        "Klarna", "GoCardless", "BlueSnap", "Recurly", "Chargebee", "Custom Gateway"
    ];

    gateways.forEach(name => {
        const div = document.createElement('div');
        div.className = "gateway-card p-4 bg-white border border-slate-100 rounded-xl cursor-pointer hover:border-blue-500 transition-all font-black text-[9px] uppercase tracking-widest text-slate-400 flex justify-between items-center italic group";
        div.innerHTML = `<span>${name}</span> <span class="text-[7px] bg-slate-50 group-hover:bg-blue-600 group-hover:text-white px-2 py-1 rounded-lg transition-colors italic">Setup</span>`;
        
        div.onclick = () => {
            // UI Toggle
            document.querySelectorAll('.gateway-card').forEach(el => el.classList.remove('selected', 'text-blue-600'));
            div.classList.add('selected', 'text-blue-600');
            
            // Set Hidden Input
            activeLabel.innerText = "Configuring: " + name;
            activeInput.value = name;

            // Show Custom Name Input if "Custom Gateway" is selected
            if (name === "Custom Gateway") {
                customField.classList.remove('hidden');
            } else {
                customField.classList.add('hidden');
            }
        };
        gatewayList.appendChild(div);
    });

    // Auto-select Stripe on load
    if (gatewayList.firstChild) gatewayList.firstChild.click();
});

function copyWebhook() {
    const url = document.getElementById('webhookUrl').innerText;
    navigator.clipboard.writeText(url);
    alert('Revenue Recovery Protocol URL Copied!');
}

document.getElementById('configForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('saveBtn');
    btn.innerText = "SYNCHRONIZING SECURE VAULT...";
    btn.disabled = true;

    // Here you would integrate with Supabase
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Saving Configuration:", data);
    
    setTimeout(() => {
        alert("System Configuration Successfully Committed!");
        btn.innerText = "Commit System Configuration →";
        btn.disabled = false;
    }, 2000);
});
