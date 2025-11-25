# Travel Guardian - Roadside Assistance India 🚗

A comprehensive roadside assistance web application designed for the Indian market. Travel Guardian connects stranded motorists with nearby service providers for emergency roadside services.

## Features

### Service Categories
- 🛞 **Tire Puncture** - Flat tire repair and replacement
- 🚗 **Need Tow** - Vehicle towing to nearest garage
- 🔋 **Battery Jump** - Dead battery jump start service
- ⛽ **Fuel Delivery** - Emergency fuel delivery
- 🔑 **Locked Out** - Lockout assistance
- 🔧 **Mechanic** - On-site mechanic for minor repairs
- 💥 **Accident Help** - Accident assistance and coordination
- ➕ **Other Services** - General roadside assistance

### Key Features
- 📍 **GPS Location Detection** - Automatically detects user's current location
- 🗺️ **Google Maps Integration** - Embedded map showing nearby service providers
- 📋 **20 Nearby Providers** - Shows list of 20 nearest assistance providers
- ⭐ **Ratings & Reviews** - User ratings and reviews for each provider
- 💳 **Multiple Payment Options** - UPI, Cards, Net Banking, Wallets, Cash on Arrival
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🔒 **Secure Payment Flow** - Demonstration of secure payment UI/UX

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Google Maps API key for full map functionality

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tarushvkodes/travelguard.git
cd travelguard
```

2. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Visit `http://localhost:8000` in your browser

### Configuration

To enable full Google Maps functionality, update the API key in `app.js`:

```javascript
const CONFIG = {
    MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
    // ... other config
};
```

## Project Structure

```
travelguard/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── app.js          # JavaScript application logic
└── README.md       # This file
```

## Usage

1. **Select a Service**: Click on one of the service buttons at the top (Tire Puncture, Need Tow, etc.)
2. **Allow Location Access**: Grant location permission when prompted for accurate nearby providers
3. **Browse Providers**: View the list of 20 nearby service providers sorted by distance
4. **Sort Options**: Sort providers by distance, rating, or price
5. **Select Provider**: Click on a provider card to view detailed information
6. **Book Service**: Click "Book Now" to proceed with booking
7. **Complete Payment**: Select payment method and complete the booking

## Payment Methods Supported

- 📱 UPI (GPay, PhonePe, Paytm)
- 💳 Credit/Debit Cards (Visa, Mastercard, RuPay)
- 🏦 Net Banking (All major banks)
- 👛 Wallets (Paytm, Amazon Pay, Mobikwik)
- 💵 Cash on Arrival

## Technologies Used

- HTML5
- CSS3 (with CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)
- Google Maps Embed API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by AAA Roadside Assistance
- Designed for the Indian market with local payment options
- Icons from Font Awesome