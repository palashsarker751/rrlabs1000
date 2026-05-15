const crypto = require('crypto');

// এটি তোমার Environment Variable থেকে আসবে
const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

export default async (req, res) => {
    const rawBody = req.body.toString();
    const signature = req.headers['x-signature'];

    // HMAC SHA256 দিয়ে ভেরিফাই করা
    const hmac = crypto.createHmac('sha256', webhookSecret);
    const digest = hmac.update(rawBody).digest('hex');

    if (signature !== digest) {
        return res.status(401).send('Unauthorized: Invalid Signature');
    }

    // সিগনেচার ম্যাচ করলে এখন ডাটা প্রসেস করো
    const event = JSON.parse(rawBody);
    
    if (event.meta.event_name === 'order_created') {
        // এখানে ইউজারকে 'Standard' বা 'Premium' এক্সেস দিয়ে দাও
        console.log('Payment Successful for:', event.data.attributes.user_email);
    }

    res.status(200).send('Webhook Received');
};
