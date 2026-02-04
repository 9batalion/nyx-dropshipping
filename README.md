# Nyx Dropshipping Shop - Setup Guide

## 🎯 Project Goal
Achieve 20,000 PLN monthly revenue in 365 days starting with 200 PLN budget using dropshipping model.

## 📦 Project Structure

```
nyx-shop/
├── index.js                 # Main Express server (product display)
├── cj-api.js                # CJ Dropshipping API client
├── shopify-api.js           # Shopify API client
├── integrate-cj-shopify.js  # Integration script to import CJ products to Shopify
├── search-products.js       # Search for products in CJ
├── views/                   # EJS templates
│   ├── layout.ejs
│   ├── index.ejs
│   ├── product.ejs
│   ├── category.ejs
│   └── cart.ejs
├── public/                  # Static assets
│   └── css/
│       └── style.css
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Setup Instructions

### 1. Get CJ Dropshipping API Key
- Register at: https://developers.cjdropshipping.com/
- Go to Dashboard → API Management
- Copy your API Key

### 2. Get Shopify API Credentials
- Sign up for Shopify 14-day trial: https://www.shopify.com/signup
- Create a custom app (Settings → Developer → API credentials)
- Add permissions: Products, Orders, Inventory (read & write)
- Get: API Key, API Secret, Access Token
- Also get your Store URL (e.g., your-store.myshopify.com)

### 3. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` with your actual API keys:
```
CJ_API_KEY=your_cj_api_key_here
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_shopify_access_token
SHOPIFY_API_VERSION=2024-01
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Search CJ Products (Optional)
```bash
npm run search
```
This will search for products in CJ and save results to `cj-search-results.json`.

### 6. Import Products to Shopify
```bash
npm run integrate
```
This will import top products from CJ to your Shopify store.

### 7. Start the Shop
```bash
npm start
# Visit: http://localhost:3000
```

## 🛒 Using the Shop

The shop currently serves as a demo store. Products are loaded from:
1. Local static products (initial demo)
2. Dynamically imported from CJ → Shopify (after running integration)

To use real products from CJ/Shopify:
- Run `npm run integrate` to import products to Shopify
- Update `index.js` to fetch products from Shopify API instead of local array

## 📊 Monitoring
- Import log: `import-log.json`
- CJ search results: `cj-search-results.json`
- Server logs: stdout

## 🚀 Next Steps After Setup
1. Review imported products in Shopify admin
2. Set up payment gateway in Shopify (Stripe, PayPal)
3. Configure shipping rates
4. Customize store theme
5. Add custom domain
6. Set up email notifications
7. Start marketing campaigns

## 💡 Important Notes
- **Markup**: We apply 200% markup by default (CJ price × 3)
- **Currency**: CJ prices in USD → converted to PLN (rate ~4.0)
- **Inventory**: Automatically updated from CJ
- **Fulfillment**: Orders fulfilled via CJ automatically after sync

## 💰 Pricing
- CJ Dropshipping: Free tier available, pay per order
- Shopify: $29/month after trial
- Domain: ~$15/year
- Payment processing: ~2.9% + $0.30 per transaction

## 🤝 Support
For issues: Check logs, verify API keys, ensure both CJ and Shopify accounts are active.