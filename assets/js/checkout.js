const MA_ONLINE = ['Seekonk','Rehoboth','Swansea','Somerset','Fall River','Attleboro','North Attleboro','Dighton','Taunton','Raynham','Norton','Mansfield','Foxborough','Sharon','Easton','Freetown','Lakeville','Berkley','Dartmouth','New Bedford','Fairhaven','Acushnet','Westport','Littleton','Littleton Common','Stow','Acton','Harvard','Maynard','Concord'];
const RI_ONLINE = ['Providence','Pawtucket','East Providence','Cranston','Warwick','Central Falls','North Providence','Johnston','Lincoln','Cumberland','Barrington','Warren','Bristol','Tiverton','Portsmouth','Middletown','Newport','West Warwick','East Greenwich','North Kingstown','Smithfield'];

const MA_CALL = ['Worcester','Lowell','Framingham','Lexington','Marlborough','Sudbury','Bolton','Hudson','Northborough','Southborough','Westborough','Shrewsbury','Grafton','Auburn','Millbury','Oxford','Webster','Dudley','Uxbridge','Northbridge','Douglas','Sutton','Upton','Hopedale','Milford','Mendon','Bellingham','Franklin','Medway','Holliston','Ashland','Hopkinton','Westford','Chelmsford','Billerica','Bedford','Burlington','Wilmington','Tewksbury','Dracut','Methuen','Lawrence','Andover','North Andover','Haverhill','Newburyport','Amesbury','Salisbury','Mattapoisett','Marion','Rochester','Wareham','Middleborough','Carver','Plymouth','Kingston','Duxbury','Marshfield','Scituate','Cohasset','Hingham','Weymouth','Braintree','Quincy','Milton','Canton','Stoughton','Brockton','Bridgewater','West Bridgewater','East Bridgewater'];
const RI_CALL = ['Woonsocket','Burrillville','Glocester','Foster','Scituate','Coventry','West Greenwich','Exeter','Richmond','Hopkinton','Charlestown','South Kingstown','Narragansett','Westerly','Jamestown','Little Compton','New Shoreham'];

const PRODUCTS = {
    '10-yard-dumpster': { name: '10 Yard Dumpster', price: 419 },
    '15-yard-dumpster': { name: '15 Yard Dumpster', price: 499 },
    '20-yard-dumpster': { name: '20 Yard Dumpster', price: 579 },
    '30-yard-dumpster': { name: '30 Yard Dumpster', price: 629 }
};

let currentStep = 1;
let orderData = {
    product_id: null,
    address: '',
    state: '',
    city: '',
    zip: '',
    phone: '',
    delivery_date: '',
    delivery_time: 'Morning (7am - 12pm)',
    pickup_date: '',
    pickup_time: 'Morning (7am - 12pm)',
    rental_days: 0,
    price: 0
};

document.addEventListener('DOMContentLoaded', () => {
    initDumpsterSelection();
    initLocationValidation();
    initDatePickers();
    initNavigation();
    
    // Check URL params for pre-selected dumpster
    const urlParams = new URLSearchParams(window.location.search);
    const size = urlParams.get('size');
    if (size && PRODUCTS[size]) {
        selectDumpster(size);
    }
});

function initDumpsterSelection() {
    const cards = document.querySelectorAll('.dumpster-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            selectDumpster(card.dataset.id);
        });
    });
}

function selectDumpster(id) {
    document.querySelectorAll('.dumpster-card').forEach(c => c.classList.remove('selected'));
    const selectedCard = document.querySelector(`.dumpster-card[data-id="${id}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        orderData.product_id = id;
        orderData.price = PRODUCTS[id].price;
        document.getElementById('btn-next-1').disabled = false;
    }
}

function initLocationValidation() {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const callBlocker = document.getElementById('call-blocker');
    const nextBtn = document.getElementById('btn-next-2');

    stateSelect.addEventListener('change', (e) => {
        const state = e.target.value;
        citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
        citySelect.disabled = false;
        callBlocker.style.display = 'none';
        nextBtn.disabled = true;

        let allCities = [];
        if (state === 'MA') {
            allCities = [...MA_ONLINE, ...MA_CALL].sort();
        } else if (state === 'RI') {
            allCities = [...RI_ONLINE, ...RI_CALL].sort();
        }

        allCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    });

    citySelect.addEventListener('change', (e) => {
        const city = e.target.value;
        const state = stateSelect.value;
        
        let isOnline = false;
        if (state === 'MA' && MA_ONLINE.includes(city)) isOnline = true;
        if (state === 'RI' && RI_ONLINE.includes(city)) isOnline = true;

        if (isOnline) {
            callBlocker.style.display = 'none';
            nextBtn.disabled = false;
        } else {
            callBlocker.style.display = 'block';
            nextBtn.disabled = true;
        }
    });

    document.getElementById('form-location').addEventListener('submit', (e) => {
        e.preventDefault();
        orderData.address = document.getElementById('address').value;
        orderData.state = document.getElementById('state').value;
        orderData.city = document.getElementById('city').value;
        orderData.zip = document.getElementById('zip').value;
        orderData.phone = document.getElementById('phone').value;
        goToStep(3);
    });
}

function initDatePickers() {
    const delDate = document.getElementById('delivery-date');
    const pickDate = document.getElementById('pickup-date');
    
    // Set min delivery date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    delDate.min = tomorrow.toISOString().split('T')[0];

    delDate.addEventListener('change', (e) => {
        const selected = new Date(e.target.value);
        if (isNaN(selected.getTime())) return;
        
        // Min pickup is delivery + 1 day
        const nextDay = new Date(selected);
        nextDay.setDate(nextDay.getDate() + 1);
        
        pickDate.disabled = false;
        pickDate.min = nextDay.toISOString().split('T')[0];
        
        // If current pickup is invalid, clear it
        if (pickDate.value && new Date(pickDate.value) <= selected) {
            pickDate.value = '';
        }
        calculateRental();
    });

    pickDate.addEventListener('change', calculateRental);

    document.getElementById('form-schedule').addEventListener('submit', (e) => {
        e.preventDefault();
        orderData.delivery_date = delDate.value;
        orderData.delivery_time = document.getElementById('delivery-time').value;
        orderData.pickup_date = pickDate.value;
        orderData.pickup_time = document.getElementById('pickup-time').value;
        populateReview();
        goToStep(4);
    });
}

function calculateRental() {
    const del = new Date(document.getElementById('delivery-date').value);
    const pick = new Date(document.getElementById('pickup-date').value);
    const notice = document.getElementById('rental-notice');
    const overage = document.getElementById('rental-overage');
    const daysEl = document.getElementById('rental-days');

    if (!isNaN(del.getTime()) && !isNaN(pick.getTime())) {
        const diffTime = Math.abs(pick - del);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        orderData.rental_days = diffDays;
        
        daysEl.textContent = diffDays;
        notice.style.display = 'block';
        
        if (diffDays > 10) {
            overage.style.display = 'block';
        } else {
            overage.style.display = 'none';
        }
    } else {
        notice.style.display = 'none';
    }
}

function populateReview() {
    document.getElementById('review-dumpster').textContent = PRODUCTS[orderData.product_id].name;
    document.getElementById('review-base-price').textContent = `$${orderData.price}`;
    
    document.getElementById('review-address').innerHTML = `${orderData.address}<br>${orderData.city}, ${orderData.state} ${orderData.zip}`;
    document.getElementById('review-phone').textContent = orderData.phone;
    
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    document.getElementById('review-delivery').textContent = `${formatDate(orderData.delivery_date)} (${orderData.delivery_time})`;
    document.getElementById('review-pickup').textContent = `${formatDate(orderData.pickup_date)} (${orderData.pickup_time})`;
    document.getElementById('review-duration').textContent = `${orderData.rental_days} Days`;

    document.getElementById('review-subtotal').textContent = `$${orderData.price.toFixed(2)}`;
    
    const taxRate = orderData.state === 'MA' ? 6.25 : 7.00;
    const taxAmount = (orderData.price * (taxRate / 100));
    const total = orderData.price + taxAmount;
    
    document.getElementById('review-tax-rate').textContent = taxRate;
    document.getElementById('review-tax-amount').textContent = `$${taxAmount.toFixed(2)}`;
    document.getElementById('review-final-total').textContent = `$${total.toFixed(2)}`;
}

function initNavigation() {
    document.getElementById('btn-next-1').addEventListener('click', () => goToStep(2));
    
    document.querySelectorAll('.checkout-back').forEach(btn => {
        btn.addEventListener('click', () => goToStep(currentStep - 1));
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => goToStep(parseInt(e.target.dataset.target)));
    });

    document.getElementById('btn-checkout').addEventListener('click', initStripe);
}

function goToStep(stepNumber) {
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    
    // Update stepper
    for (let i = 1; i <= 5; i++) {
        const nav = document.getElementById(`step-nav-${i}`);
        if (i < stepNumber) {
            nav.classList.add('completed');
            nav.classList.remove('active');
        } else if (i === stepNumber) {
            nav.classList.add('active');
            nav.classList.remove('completed');
        } else {
            nav.classList.remove('active', 'completed');
        }
    }
    
    currentStep = stepNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let stripeInstance = null;
const stripePublicKey = 'pk_test_placeholder'; // In production, this would be injected or fetched. 
// For this static site, we can fetch it from the server, but the user said "Required environment variables: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY".
// Since we are not using Next.js, we will just fetch it from the server config route if needed, or we can hardcode the test key if they provide it.
// Let's create an endpoint to get the public key.

async function initStripe() {
    const errorMsg = document.getElementById('checkout-error');
    errorMsg.textContent = '';
    goToStep(5);

    try {
        // First get the publishable key
        const configRes = await fetch('/api/config');
        if (!configRes.ok) throw new Error('Failed to load payment configuration');
        const { publishableKey } = await configRes.json();
        
        stripeInstance = Stripe(publishableKey);

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        document.getElementById('checkout-spinner').style.display = 'none';
        const checkout = await stripeInstance.initEmbeddedCheckout({
            clientSecret: data.clientSecret,
        });

        checkout.mount('#checkout-embed');
    } catch (err) {
        goToStep(4);
        errorMsg.textContent = err.message || 'An error occurred initializing payment. Please try again.';
    }
}
