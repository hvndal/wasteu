document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const container = document.getElementById('success-content');

    if (!sessionId) {
        container.innerHTML = `
            <div class="success-icon" style="background: #ef4444;">!</div>
            <h1>Invalid Request</h1>
            <p>No session ID found. Please return to the homepage.</p>
            <a href="index.html" class="btn btn-primary">Return Home</a>
        `;
        return;
    }

    try {
        const response = await fetch(`/api/session?session_id=${sessionId}`);
        const data = await response.json();

        if (data.status === 'complete') {
            const meta = data.metadata;
            const sizeMap = {
                '10-yard-dumpster': '10 Yard Dumpster',
                '15-yard-dumpster': '15 Yard Dumpster',
                '20-yard-dumpster': '20 Yard Dumpster',
                '30-yard-dumpster': '30 Yard Dumpster'
            };

            container.innerHTML = `
                <div class="success-icon">✓</div>
                <h1>Order Confirmed!</h1>
                <p>Thank you for choosing Waste Universe. A confirmation email has been sent to <strong>${data.customer_email || 'your email'}</strong>.</p>
                
                <div style="background: #f8fafc; padding: 24px; border-radius: 8px; text-align: left; max-width: 500px; margin: 0 auto 30px;">
                    <h3 style="margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Order Details</h3>
                    <p><strong>Service:</strong> ${sizeMap[meta.container_size] || meta.container_size}</p>
                    <p><strong>Delivery Address:</strong><br>${meta.delivery_address}<br>${meta.city}, ${meta.state} ${meta.zip_code}</p>
                    <p style="margin-top:10px;"><strong>Delivery:</strong> ${meta.delivery_date} (${meta.delivery_time})</p>
                    <p><strong>Pickup:</strong> ${meta.pickup_date} (${meta.pickup_time})</p>
                    <p style="margin-top:10px;"><strong>Phone:</strong> ${meta.phone_number}</p>
                </div>

                <a href="index.html" class="btn btn-primary">Return to Homepage</a>
            `;
            
            // Optional: Play a chime sound if we had an audio file
            // const chime = new Audio('assets/audio/success.mp3');
            // chime.play().catch(e => console.log('Audio autoplay blocked'));
        } else {
            container.innerHTML = `
                <div class="success-icon" style="background: #f59e0b;">!</div>
                <h1>Payment Pending</h1>
                <p>Your payment is still processing. Please check your email for confirmation.</p>
                <a href="index.html" class="btn btn-primary">Return Home</a>
            `;
        }
    } catch (err) {
        container.innerHTML = `
            <div class="success-icon" style="background: #ef4444;">!</div>
            <h1>Error Verifying Payment</h1>
            <p>Please check your email for a receipt to confirm your order went through.</p>
            <a href="index.html" class="btn btn-primary">Return Home</a>
        `;
    }
});
