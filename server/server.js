// server.js
import express from 'express';
import Stripe from 'stripe';
const app = express();
const stripe = Stripe('sk_test_51Q8jq8Ftd15Us6gbc0ENHC7uzr1GTiGJUVU3Mi6qKeTts5Am7YJFB34DZpunHjLf9Lk8y4xXkjEybcAjrgYWgXkh00MfF0TdXv');

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
