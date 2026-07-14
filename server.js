require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Webhook endpoint must use raw body
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(`[Stripe Webhook] Payment successful for session: ${session.id}`);
        
        // Save to data/orders.json for idempotency
        const dataPath = path.join(__dirname, 'data', 'orders.json');
        let orders = [];
        if (fs.existsSync(dataPath)) {
            orders = JSON.parse(fs.readFileSync(dataPath));
        }
        
        if (!orders.find(o => o.id === session.id)) {
            orders.push({
                id: session.id,
                metadata: session.metadata,
                amount_total: session.amount_total,
                status: session.payment_status,
                created: new Date().toISOString()
            });
            
            if (!fs.existsSync(path.join(__dirname, 'data'))) {
                fs.mkdirSync(path.join(__dirname, 'data'));
            }
            fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));
        }
    }

    res.send();
});

// Regular JSON parsing for other routes
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Pricing mapping based on legacy product specs
const PRODUCTS = {
    '10-yard-dumpster': { name: '10 Yard Dumpster Rental', price: 41900 },
    '15-yard-dumpster': { name: '15 Yard Dumpster Rental', price: 49900 },
    '20-yard-dumpster': { name: '20 Yard Dumpster Rental', price: 57900 },
    '30-yard-dumpster': { name: '30 Yard Dumpster Rental', price: 62900 }
};

const VALID_MA_CITIES = ['Seekonk','Rehoboth','Swansea','Somerset','Fall River','Attleboro','North Attleboro','Dighton','Taunton','Raynham','Norton','Mansfield','Foxborough','Sharon','Easton','Freetown','Lakeville','Berkley','Dartmouth','New Bedford','Fairhaven','Acushnet','Westport','Littleton','Littleton Common','Stow','Acton','Harvard','Maynard','Concord'];
const VALID_RI_CITIES = ['Providence','Pawtucket','East Providence','Cranston','Warwick','Central Falls','North Providence','Johnston','Lincoln','Cumberland','Barrington','Warren','Bristol','Tiverton','Portsmouth','Middletown','Newport','West Warwick','East Greenwich','North Kingstown','Smithfield'];

app.post('/api/checkout', async (req, res) => {
    try {
        const { product_id, address, city, state, zip, phone, delivery_date, delivery_time, pickup_date, pickup_time, rental_days } = req.body;

        if (!PRODUCTS[product_id]) {
            return res.status(400).json({ error: 'Invalid product selected.' });
        }
        
        let taxRate = 0;
        if (state === 'MA') {
            if (!VALID_MA_CITIES.includes(city)) return res.status(400).json({ error: 'City not eligible for online checkout in MA.' });
            taxRate = 0.0625;
        } else if (state === 'RI') {
            if (!VALID_RI_CITIES.includes(city)) return res.status(400).json({ error: 'City not eligible for online checkout in RI.' });
            taxRate = 0.07;
        } else {
            return res.status(400).json({ error: 'Invalid state selected. Only MA and RI are supported.' });
        }

        const basePrice = PRODUCTS[product_id].price;
        const taxAmount = Math.round(basePrice * taxRate);

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: PRODUCTS[product_id].name,
                        },
                        unit_amount: basePrice,
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Sales Tax',
                        },
                        unit_amount: taxAmount,
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            return_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                delivery_address: address,
                delivery_date,
                delivery_time,
                container_size: product_id,
                service_type: 'Dumpster Rental',
                phone_number: phone,
                sales_tax: taxAmount,
                tax_rate: taxRate,
                pickup_date,
                pickup_time,
                rental_days,
                city,
                state,
                zip_code: zip
            }
        });

        res.json({ clientSecret: session.client_secret });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/session', async (req, res) => {
    try {
        const { session_id } = req.query;
        if (!session_id) return res.status(400).json({ error: 'Missing session ID' });
        
        const session = await stripe.checkout.sessions.retrieve(session_id);
        res.json({
            status: session.status,
            customer_email: session.customer_details?.email,
            metadata: session.metadata
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/config', (req, res) => {
    res.json({ publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY });
});

app.listen(PORT, () => {
    console.log(`Waste Universe server running on http://localhost:${PORT}`);
});
