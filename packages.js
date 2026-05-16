// Subscription Data Config
const pricing = {
    monthly: {
        standard: { price: "$29", link: "https://checkout.rrlabs.online/buy/standard-monthly" },
        premium: { price: "$99", link: "https://checkout.rrlabs.online/checkout/buy/c921437b-cb0f-44f7-b6ff-f53e039c6903" },
        enterprise: { price: "$299", link: "https://checkout.rrlabs.online/buy/enterprise-monthly" }
    },
    yearly: {
        standard: { price: "$279", link: "https://checkout.rrlabs.online/buy/standard-yearly" }, // ~20% Off
        premium: { price: "$950", link: "https://checkout.rrlabs.online/buy/premium-yearly" },
        enterprise: { price: "$2800", link: "https://checkout.rrlabs.online/buy/enterprise-yearly" }
    }
};

const billingToggle = document.getElementById('billing-toggle');
const standardPrice = document.getElementById('standard-price');
const premiumPrice = document.getElementById('premium-price');
const enterprisePrice = document.getElementById('enterprise-price');

// Update UI based on Toggle
billingToggle.addEventListener('change', () => {
    const mode = billingToggle.checked ? 'yearly' : 'monthly';
    
    // Update Prices with Animation
    standardPrice.innerText = pricing[mode].standard.price;
    premiumPrice.innerText = pricing[mode].premium.price;
    enterprisePrice.innerText = pricing[mode].enterprise.price;

    // Optional: Add a smooth fade-in effect to numbers
    [standardPrice, premiumPrice, enterprisePrice].forEach(el => {
        el.classList.add('animate-pulse');
        setTimeout(() => el.classList.remove('animate-pulse'), 500);
    });
});

// Master Subscription Function
function subscribe(plan) {
    const mode = billingToggle.checked ? 'yearly' : 'monthly';
    
    if (plan === 'free') {
        alert("Redirecting to Dashboard for Free Activation...");
        window.location.href = 'dashboard.html';
        return;
    }

    const checkoutUrl = pricing[mode][plan].link;
    
    // Redirect to Lemon Squeezy
    console.log(`Redirecting to: ${checkoutUrl}`);
    window.location.href = checkoutUrl;
}
