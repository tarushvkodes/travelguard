/**
 * Travel Guardian - Roadside Assistance India
 * Main JavaScript Application
 */

// ============================================
// Configuration & Data
// ============================================

const CONFIG = {
    // Google Maps API Key placeholder - Replace with actual key
    MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
    DEFAULT_LAT: 28.6139,  // Delhi coordinates as default
    DEFAULT_LNG: 77.2090,
    SEARCH_RADIUS: 10000,  // 10km radius
};

// Service types configuration
const SERVICE_TYPES = {
    tire: {
        name: 'Tire Puncture',
        icon: 'fa-tire',
        description: 'Flat tire repair and replacement',
        basePrice: 300
    },
    tow: {
        name: 'Towing Service',
        icon: 'fa-truck-pickup',
        description: 'Vehicle towing to nearest garage',
        basePrice: 1500
    },
    battery: {
        name: 'Battery Jump Start',
        icon: 'fa-car-battery',
        description: 'Dead battery jump start service',
        basePrice: 500
    },
    fuel: {
        name: 'Fuel Delivery',
        icon: 'fa-gas-pump',
        description: 'Emergency fuel delivery',
        basePrice: 200
    },
    lockout: {
        name: 'Lockout Service',
        icon: 'fa-key',
        description: 'Locked out of vehicle assistance',
        basePrice: 400
    },
    mechanic: {
        name: 'On-Site Mechanic',
        icon: 'fa-wrench',
        description: 'Minor repairs and diagnostics',
        basePrice: 600
    },
    accident: {
        name: 'Accident Assistance',
        icon: 'fa-car-crash',
        description: 'Accident help and coordination',
        basePrice: 0
    },
    other: {
        name: 'Other Services',
        icon: 'fa-ellipsis-h',
        description: 'General roadside assistance',
        basePrice: 400
    }
};

// Sample provider data (simulating API response)
const SAMPLE_PROVIDERS = [
    {
        id: 1,
        name: "Quick Fix Auto Care",
        rating: 4.8,
        reviews: 256,
        distance: 0.8,
        eta: 10,
        price: 350,
        phone: "+91 98765 43210",
        services: ["Tire Repair", "Battery", "Fuel"],
        verified: true,
        image: "QF"
    },
    {
        id: 2,
        name: "Road Warriors Assistance",
        rating: 4.6,
        reviews: 189,
        distance: 1.2,
        eta: 12,
        price: 320,
        phone: "+91 98765 43211",
        services: ["Tire Repair", "Towing", "Mechanic"],
        verified: true,
        image: "RW"
    },
    {
        id: 3,
        name: "Sharma Motor Works",
        rating: 4.7,
        reviews: 342,
        distance: 1.5,
        eta: 15,
        price: 280,
        phone: "+91 98765 43212",
        services: ["All Services"],
        verified: true,
        image: "SM"
    },
    {
        id: 4,
        name: "Highway Helper India",
        rating: 4.5,
        reviews: 127,
        distance: 2.1,
        eta: 18,
        price: 400,
        phone: "+91 98765 43213",
        services: ["Tire Repair", "Towing"],
        verified: false,
        image: "HH"
    },
    {
        id: 5,
        name: "Emergency Auto Services",
        rating: 4.9,
        reviews: 512,
        distance: 2.3,
        eta: 20,
        price: 450,
        phone: "+91 98765 43214",
        services: ["Tire Repair", "Battery", "Lockout"],
        verified: true,
        image: "EA"
    },
    {
        id: 6,
        name: "City Garage Express",
        rating: 4.4,
        reviews: 98,
        distance: 2.8,
        eta: 22,
        price: 290,
        phone: "+91 98765 43215",
        services: ["Tire Repair", "Mechanic"],
        verified: true,
        image: "CG"
    },
    {
        id: 7,
        name: "Rapid Rescue Motors",
        rating: 4.7,
        reviews: 234,
        distance: 3.0,
        eta: 25,
        price: 380,
        phone: "+91 98765 43216",
        services: ["All Services"],
        verified: true,
        image: "RR"
    },
    {
        id: 8,
        name: "24/7 Auto Assist",
        rating: 4.3,
        reviews: 156,
        distance: 3.2,
        eta: 27,
        price: 310,
        phone: "+91 98765 43217",
        services: ["Tire Repair", "Fuel Delivery"],
        verified: false,
        image: "AA"
    },
    {
        id: 9,
        name: "Patil Auto Solutions",
        rating: 4.6,
        reviews: 289,
        distance: 3.5,
        eta: 28,
        price: 340,
        phone: "+91 98765 43218",
        services: ["Tire Repair", "Battery", "Towing"],
        verified: true,
        image: "PA"
    },
    {
        id: 10,
        name: "Metro Roadside Help",
        rating: 4.5,
        reviews: 178,
        distance: 3.8,
        eta: 30,
        price: 360,
        phone: "+91 98765 43219",
        services: ["All Services"],
        verified: true,
        image: "MR"
    },
    {
        id: 11,
        name: "Gupta Tire Services",
        rating: 4.2,
        reviews: 89,
        distance: 4.1,
        eta: 32,
        price: 250,
        phone: "+91 98765 43220",
        services: ["Tire Repair"],
        verified: false,
        image: "GT"
    },
    {
        id: 12,
        name: "Safe Journey Assist",
        rating: 4.8,
        reviews: 367,
        distance: 4.3,
        eta: 33,
        price: 420,
        phone: "+91 98765 43221",
        services: ["Tire Repair", "Towing", "Accident"],
        verified: true,
        image: "SJ"
    },
    {
        id: 13,
        name: "National Auto Care",
        rating: 4.4,
        reviews: 145,
        distance: 4.6,
        eta: 35,
        price: 330,
        phone: "+91 98765 43222",
        services: ["Tire Repair", "Battery"],
        verified: true,
        image: "NA"
    },
    {
        id: 14,
        name: "Express Fix India",
        rating: 4.6,
        reviews: 234,
        distance: 4.9,
        eta: 38,
        price: 370,
        phone: "+91 98765 43223",
        services: ["All Services"],
        verified: true,
        image: "EF"
    },
    {
        id: 15,
        name: "Singh Auto Services",
        rating: 4.3,
        reviews: 112,
        distance: 5.2,
        eta: 40,
        price: 290,
        phone: "+91 98765 43224",
        services: ["Tire Repair", "Mechanic"],
        verified: false,
        image: "SA"
    },
    {
        id: 16,
        name: "Wheels On Call",
        rating: 4.7,
        reviews: 298,
        distance: 5.5,
        eta: 42,
        price: 400,
        phone: "+91 98765 43225",
        services: ["Tire Repair", "Towing", "Battery"],
        verified: true,
        image: "WO"
    },
    {
        id: 17,
        name: "Delhi Auto Rescue",
        rating: 4.5,
        reviews: 167,
        distance: 5.8,
        eta: 45,
        price: 350,
        phone: "+91 98765 43226",
        services: ["All Services"],
        verified: true,
        image: "DA"
    },
    {
        id: 18,
        name: "Pro Mechanic Hub",
        rating: 4.4,
        reviews: 143,
        distance: 6.1,
        eta: 48,
        price: 380,
        phone: "+91 98765 43227",
        services: ["Mechanic", "Battery", "Tire Repair"],
        verified: true,
        image: "PM"
    },
    {
        id: 19,
        name: "Highway Angels",
        rating: 4.8,
        reviews: 423,
        distance: 6.5,
        eta: 50,
        price: 450,
        phone: "+91 98765 43228",
        services: ["Towing", "Accident", "All Services"],
        verified: true,
        image: "HA"
    },
    {
        id: 20,
        name: "Bharat Auto Assist",
        rating: 4.2,
        reviews: 78,
        distance: 7.0,
        eta: 55,
        price: 280,
        phone: "+91 98765 43229",
        services: ["Tire Repair", "Fuel Delivery"],
        verified: false,
        image: "BA"
    }
];

// Sample reviews
const SAMPLE_REVIEWS = [
    { name: "Rahul K.", stars: 5, text: "Very quick response! Fixed my flat tire in 15 minutes." },
    { name: "Priya S.", stars: 4, text: "Professional service. Slightly delayed but got the job done." },
    { name: "Amit M.", stars: 5, text: "Excellent service at reasonable price. Highly recommended!" }
];

// ============================================
// State Management
// ============================================

let state = {
    currentService: 'tire',
    currentLocation: null,
    selectedProvider: null,
    selectedPaymentMethod: null,
    providers: [...SAMPLE_PROVIDERS]
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    serviceButtons: document.querySelectorAll('.service-btn'),
    currentLocation: document.getElementById('current-location'),
    refreshLocation: document.getElementById('refresh-location'),
    mapPlaceholder: document.getElementById('map-placeholder'),
    googleMap: document.getElementById('google-map'),
    serviceTitle: document.getElementById('service-title'),
    providersList: document.getElementById('providers-list'),
    sortBy: document.getElementById('sort-by'),
    providerModal: document.getElementById('provider-modal'),
    providerDetail: document.getElementById('provider-detail'),
    paymentModal: document.getElementById('payment-modal'),
    paymentContent: document.getElementById('payment-content'),
    confirmationModal: document.getElementById('confirmation-modal'),
    bookingDetails: document.getElementById('booking-details'),
    loadingOverlay: document.getElementById('loading-overlay')
};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize location
    getCurrentLocation();
    
    // Render providers list
    renderProviders();
    
    // Setup event listeners
    setupEventListeners();
}

// ============================================
// Location Functions
// ============================================

function getCurrentLocation() {
    elements.currentLocation.textContent = 'Detecting your location...';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            handleLocationSuccess,
            handleLocationError,
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
    } else {
        handleLocationError({ code: 0, message: 'Geolocation not supported' });
    }
}

function handleLocationSuccess(position) {
    state.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    
    // Reverse geocode to get address (simulated)
    const address = getSimulatedAddress(state.currentLocation);
    elements.currentLocation.textContent = address;
    
    // Update map
    updateMap(state.currentLocation);
    
    // Re-render providers with distance calculations
    renderProviders();
}

function handleLocationError(error) {
    console.warn('Location error:', error.message);
    
    // Use default location (Delhi)
    state.currentLocation = {
        lat: CONFIG.DEFAULT_LAT,
        lng: CONFIG.DEFAULT_LNG
    };
    
    elements.currentLocation.textContent = 'Connaught Place, New Delhi (Default)';
    updateMap(state.currentLocation);
    renderProviders();
}

function getSimulatedAddress(coords) {
    // Simulated addresses for demo
    const addresses = [
        'Connaught Place, New Delhi',
        'Rajouri Garden, New Delhi',
        'Lajpat Nagar, New Delhi',
        'Saket, New Delhi',
        'Karol Bagh, New Delhi'
    ];
    return addresses[Math.floor(Math.random() * addresses.length)];
}

// ============================================
// Map Functions
// ============================================

function updateMap(location) {
    // Hide placeholder, show map
    elements.mapPlaceholder.style.display = 'none';
    elements.googleMap.style.display = 'block';
    
    // Create Google Maps embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${CONFIG.MAPS_API_KEY}&q=auto+repair+near+${location.lat},${location.lng}&zoom=14`;
    
    // For demo without API key, use a generic embed
    const demoMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14007.901004684848!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1609459200000!5m2!1sen!2sin`;
    
    elements.googleMap.src = demoMapUrl;
}

// ============================================
// Service Selection
// ============================================

function selectService(serviceType) {
    state.currentService = serviceType;
    
    // Update active button
    elements.serviceButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.service === serviceType);
    });
    
    // Update title
    const service = SERVICE_TYPES[serviceType];
    elements.serviceTitle.textContent = `${service.name} Services Nearby`;
    
    // Re-render providers
    renderProviders();
}

// ============================================
// Provider Functions
// ============================================

function renderProviders() {
    const sortedProviders = sortProviders([...state.providers]);
    
    elements.providersList.innerHTML = sortedProviders.map(provider => `
        <div class="provider-card" onclick="showProviderDetail(${provider.id})">
            <div class="provider-avatar">
                ${provider.image}
            </div>
            <div class="provider-info">
                <div class="provider-name">
                    ${provider.name}
                    ${provider.verified ? '<i class="fas fa-check-circle" style="color: #00C853; margin-left: 5px;" title="Verified Provider"></i>' : ''}
                </div>
                <div class="provider-rating">
                    <span class="stars">${generateStars(provider.rating)}</span>
                    <span class="rating-text">${provider.rating} (${provider.reviews} reviews)</span>
                </div>
                <div class="provider-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${provider.distance} km</span>
                    <span><i class="fas fa-phone"></i> ${provider.phone}</span>
                </div>
            </div>
            <div class="provider-price">
                <div class="price">₹${provider.price}</div>
                <div class="price-label">Est. Price</div>
                <div class="eta-badge">ETA: ${provider.eta} min</div>
            </div>
        </div>
    `).join('');
}

function sortProviders(providers) {
    const sortBy = elements.sortBy.value;
    
    switch(sortBy) {
        case 'distance':
            return providers.sort((a, b) => a.distance - b.distance);
        case 'rating':
            return providers.sort((a, b) => b.rating - a.rating);
        case 'price':
            return providers.sort((a, b) => a.price - b.price);
        default:
            return providers;
    }
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function showProviderDetail(providerId) {
    const provider = state.providers.find(p => p.id === providerId);
    if (!provider) return;
    
    state.selectedProvider = provider;
    
    elements.providerDetail.innerHTML = `
        <div class="provider-detail-header">
            <div class="provider-detail-avatar">
                ${provider.image}
            </div>
            <h2>${provider.name}</h2>
            <div class="provider-rating">
                <span class="stars">${generateStars(provider.rating)}</span>
                <span class="rating-text">${provider.rating} (${provider.reviews} reviews)</span>
            </div>
        </div>
        <div class="provider-detail-body">
            <div class="detail-section">
                <h3><i class="fas fa-info-circle"></i> Details</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Distance</label>
                        <span class="value">${provider.distance} km away</span>
                    </div>
                    <div class="detail-item">
                        <label>ETA</label>
                        <span class="value">${provider.eta} minutes</span>
                    </div>
                    <div class="detail-item">
                        <label>Phone</label>
                        <span class="value">${provider.phone}</span>
                    </div>
                    <div class="detail-item">
                        <label>Est. Price</label>
                        <span class="value" style="color: #00C853; font-size: 1.1rem;">₹${provider.price}</span>
                    </div>
                </div>
            </div>
            <div class="detail-section">
                <h3><i class="fas fa-tools"></i> Services Offered</h3>
                <div class="services-list">
                    ${provider.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
                </div>
            </div>
            <div class="detail-section">
                <h3><i class="fas fa-comments"></i> Recent Reviews</h3>
                <div class="reviews-list">
                    ${SAMPLE_REVIEWS.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-name">${review.name}</span>
                                <span class="review-stars">${generateStars(review.stars)}</span>
                            </div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="provider-detail-actions">
            <button class="btn btn-outline" onclick="callProvider('${provider.phone}')">
                <i class="fas fa-phone"></i> Call
            </button>
            <button class="btn btn-primary" onclick="initiateBooking()">
                <i class="fas fa-calendar-check"></i> Book Now
            </button>
        </div>
    `;
    
    openModal('provider-modal');
}

function callProvider(phone) {
    window.location.href = `tel:${phone}`;
}

// ============================================
// Booking & Payment Functions
// ============================================

function initiateBooking() {
    closeModal('provider-modal');
    showPaymentModal();
}

function showPaymentModal() {
    const provider = state.selectedProvider;
    const service = SERVICE_TYPES[state.currentService];
    const serviceFee = 50;
    const total = provider.price + serviceFee;
    
    elements.paymentContent.innerHTML = `
        <div class="payment-summary">
            <div class="summary-item">
                <span>Service: ${service.name}</span>
                <span>₹${provider.price}</span>
            </div>
            <div class="summary-item">
                <span>Provider: ${provider.name}</span>
                <span></span>
            </div>
            <div class="summary-item">
                <span>Platform Fee</span>
                <span>₹${serviceFee}</span>
            </div>
            <div class="summary-item">
                <span>Total</span>
                <span>₹${total}</span>
            </div>
        </div>
        <div class="payment-methods">
            <h3>Select Payment Method</h3>
            <div class="payment-options">
                <label class="payment-option" onclick="selectPaymentMethod('upi')">
                    <input type="radio" name="payment" value="upi">
                    <i class="fas fa-mobile-alt"></i>
                    <div class="payment-option-text">
                        <div class="payment-option-title">UPI Payment</div>
                        <div class="payment-option-desc">Pay via GPay, PhonePe, Paytm</div>
                    </div>
                </label>
                <label class="payment-option" onclick="selectPaymentMethod('card')">
                    <input type="radio" name="payment" value="card">
                    <i class="fas fa-credit-card"></i>
                    <div class="payment-option-text">
                        <div class="payment-option-title">Credit/Debit Card</div>
                        <div class="payment-option-desc">Visa, Mastercard, RuPay</div>
                    </div>
                </label>
                <label class="payment-option" onclick="selectPaymentMethod('netbanking')">
                    <input type="radio" name="payment" value="netbanking">
                    <i class="fas fa-university"></i>
                    <div class="payment-option-text">
                        <div class="payment-option-title">Net Banking</div>
                        <div class="payment-option-desc">All major banks supported</div>
                    </div>
                </label>
                <label class="payment-option" onclick="selectPaymentMethod('wallet')">
                    <input type="radio" name="payment" value="wallet">
                    <i class="fas fa-wallet"></i>
                    <div class="payment-option-text">
                        <div class="payment-option-title">Wallet</div>
                        <div class="payment-option-desc">Paytm, Amazon Pay, Mobikwik</div>
                    </div>
                </label>
                <label class="payment-option" onclick="selectPaymentMethod('cod')">
                    <input type="radio" name="payment" value="cod">
                    <i class="fas fa-money-bill-wave"></i>
                    <div class="payment-option-text">
                        <div class="payment-option-title">Cash on Arrival</div>
                        <div class="payment-option-desc">Pay when service is complete</div>
                    </div>
                </label>
            </div>
        </div>
        <div id="payment-form-container">
            <!-- Dynamic payment form will be inserted here -->
        </div>
        <div class="payment-actions">
            <button id="pay-button" class="btn btn-success btn-block" onclick="processPayment()" disabled>
                <i class="fas fa-lock"></i> Pay ₹${total}
            </button>
        </div>
    `;
    
    openModal('payment-modal');
}

function selectPaymentMethod(method) {
    state.selectedPaymentMethod = method;
    
    // Update selected state visually
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    event.currentTarget.querySelector('input').checked = true;
    
    // Enable pay button
    document.getElementById('pay-button').disabled = false;
    
    // Show relevant form
    const formContainer = document.getElementById('payment-form-container');
    
    switch(method) {
        case 'upi':
            formContainer.innerHTML = `
                <div class="payment-form active">
                    <div class="form-group">
                        <label>UPI ID</label>
                        <input type="text" placeholder="yourname@upi" id="upi-id">
                    </div>
                </div>
            `;
            break;
        case 'card':
            formContainer.innerHTML = `
                <div class="payment-form active">
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" id="card-number" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiry Date</label>
                            <input type="text" placeholder="MM/YY" id="card-expiry" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="password" placeholder="***" id="card-cvv" maxlength="4">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="Name on card" id="card-name">
                    </div>
                </div>
            `;
            break;
        case 'netbanking':
            formContainer.innerHTML = `
                <div class="payment-form active">
                    <div class="form-group">
                        <label>Select Bank</label>
                        <select id="bank-select" style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--border-radius); font-family: inherit;">
                            <option value="">Choose your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                            <option value="bob">Bank of Baroda</option>
                            <option value="other">Other Banks</option>
                        </select>
                    </div>
                </div>
            `;
            break;
        case 'wallet':
            formContainer.innerHTML = `
                <div class="payment-form active">
                    <div class="form-group">
                        <label>Select Wallet</label>
                        <select id="wallet-select" style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--border-radius); font-family: inherit;">
                            <option value="">Choose your wallet</option>
                            <option value="paytm">Paytm</option>
                            <option value="amazon">Amazon Pay</option>
                            <option value="mobikwik">Mobikwik</option>
                            <option value="freecharge">Freecharge</option>
                            <option value="airtel">Airtel Money</option>
                        </select>
                    </div>
                </div>
            `;
            break;
        case 'cod':
            formContainer.innerHTML = `
                <div class="payment-form active">
                    <p style="padding: 20px; text-align: center; color: var(--text-secondary);">
                        <i class="fas fa-info-circle"></i> 
                        No advance payment required. Pay directly to the service provider after the service is completed.
                    </p>
                </div>
            `;
            document.getElementById('pay-button').innerHTML = '<i class="fas fa-check"></i> Confirm Booking';
            break;
    }
}

function processPayment() {
    showLoading();
    
    // Simulate payment processing
    setTimeout(() => {
        hideLoading();
        closeModal('payment-modal');
        showConfirmation();
    }, 2000);
}

function showConfirmation() {
    const provider = state.selectedProvider;
    const service = SERVICE_TYPES[state.currentService];
    const bookingId = 'TG' + Date.now().toString().slice(-8);
    
    elements.bookingDetails.innerHTML = `
        <div class="booking-detail-item">
            <span>Booking ID</span>
            <span><strong>${bookingId}</strong></span>
        </div>
        <div class="booking-detail-item">
            <span>Service</span>
            <span>${service.name}</span>
        </div>
        <div class="booking-detail-item">
            <span>Provider</span>
            <span>${provider.name}</span>
        </div>
        <div class="booking-detail-item">
            <span>ETA</span>
            <span>${provider.eta} minutes</span>
        </div>
        <div class="booking-detail-item">
            <span>Contact</span>
            <span>${provider.phone}</span>
        </div>
        <div class="booking-detail-item">
            <span>Payment Method</span>
            <span>${state.selectedPaymentMethod.toUpperCase()}</span>
        </div>
    `;
    
    openModal('confirmation-modal');
}

function trackProvider() {
    closeModal('confirmation-modal');
    alert('Provider tracking would open in a real implementation. The provider is on their way!');
}

// ============================================
// Modal Functions
// ============================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Loading Functions
// ============================================

function showLoading() {
    elements.loadingOverlay.classList.add('active');
}

function hideLoading() {
    elements.loadingOverlay.classList.remove('active');
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Service button clicks
    elements.serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => selectService(btn.dataset.service));
    });
    
    // Refresh location
    elements.refreshLocation.addEventListener('click', () => {
        getCurrentLocation();
    });
    
    // Sort change
    elements.sortBy.addEventListener('change', () => {
        renderProviders();
    });
    
    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

// ============================================
// Utility Functions
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}
