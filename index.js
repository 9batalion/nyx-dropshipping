const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ustawienie silnika szablonów
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default static products (fallback)
const defaultProducts = [
    {
        id: 1,
        name: 'Anime Phone Case',
        description: 'Stylowa obudowa z motywem anime dla iPhone i Android',
        price: 49.99,
        image: 'https://via.placeholder.com/300x300.png?text=Anime+Case',
        category: 'phone-accessories'
    },
    {
        id: 2,
        name: 'LED Selfie Ring Light',
        description: 'Latarek do selfie z regulowanym oświetleniem LED',
        price: 59.99,
        image: 'https://via.placeholder.com/300x300.png?text=Ring+Light',
        category: 'photo-gear'
    },
    {
        id: 3,
        name: 'Adjustable Phone Tripod',
        description: 'Trójnóg z regulowanym uchwytem i zdalnym sterowaniem',
        price: 69.99,
        image: 'https://via.placeholder.com/300x300.png?text=Phone+Tripod',
        category: 'photo-gear'
    },
    {
        id: 4,
        name: 'Crystal Clear Power Bank',
        description: 'Power bank z zabawką w środku - idealny prezent',
        price: 59.99,
        image: 'https://via.placeholder.com/300x300.png?text=Power+Bank',
        category: 'electronics'
    }
];

let products = defaultProducts;

// Load products from CJ search results if available
try {
    const searchResultsPath = path.join(__dirname, 'cj-search-results.json');
    if (fs.existsSync(searchResultsPath)) {
        const searchResults = JSON.parse(fs.readFileSync(searchResultsPath, 'utf8'));
        
        // Extract and flatten all products from all categories
        const allProducts = [];
        const extractProducts = (result) => {
            if (result.content && Array.isArray(result.content)) {
                return result.content;
            }
            return [];
        };
        
        if (searchResults.phoneCases) allProducts.push(...extractProducts(searchResults.phoneCases));
        if (searchResults.ledLights) allProducts.push(...extractProducts(searchResults.ledLights));
        if (searchResults.tripods) allProducts.push(...extractProducts(searchResults.tripods));
        if (searchResults.powerBanks) allProducts.push(...extractProducts(searchResults.powerBanks));
        
        // Also check for direct arrays (from mock data)
        if (allProducts.length === 0) {
            if (Array.isArray(searchResults.phoneCases)) allProducts.push(...searchResults.phoneCases);
            if (Array.isArray(searchResults.ledLights)) allProducts.push(...searchResults.ledLights);
            if (Array.isArray(searchResults.tripods)) allProducts.push(...searchResults.tripods);
            if (Array.isArray(searchResults.powerBanks)) allProducts.push(...searchResults.powerBanks);
        }
        
        if (allProducts.length > 0) {
            // Transform CJ products to our format
            products = allProducts.map(p => ({
                id: p.id || p.pid,
                name: p.nameEn || p.productNameEn || 'Unknown Product',
                description: p.description || 'High quality product from CJ Dropshipping.',
                price: parseFloat(p.sellPrice) * 4.0 || 49.99, // Convert USD to PLN (approx 4:1)
                image: p.bigImage || (p.variantImage && p.variantImage[0]) || 'https://via.placeholder.com/300x300.png?text=Product',
                category: (p.threeCategoryName || p.categoryName || 'general').toLowerCase().replace(/\s+/g, '-'),
                sku: p.sku || p.productSku,
                supplier: p.supplierName,
                inventory: p.warehouseInventoryNum || p.totalVerifiedInventory || 100,
                cjProductId: p.id || p.pid
            }));
            
            console.log(`✅ Loaded ${products.length} products from CJ search results (${searchResults.timestamp ? 'sourced: ' + searchResults.source : ''})`);
        }
    }
} catch (err) {
    console.log('⚠️  Could not load CJ search results, using default products:', err.message);
}

console.log(`🛍️  Shop initialized with ${products.length} products`);

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Strona główna
app.get('/', (req, res) => {
    res.render('index', { 
        products: products,
        title: 'Nyx Shop - Najgorętsze trendy',
        totalProducts: products.length
    });
});

// Strona produktu
app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).render('error', { 
            message: 'Product not found',
            title: 'Error - Product Not Found'
        });
    }
    res.render('product', { 
        product: product,
        title: product.name
    });
});

// Strona kategorii
app.get('/category/:name', (req, res) => {
    const categoryProducts = products.filter(p => p.category === req.params.name);
    res.render('category', { 
        products: categoryProducts,
        categoryName: req.params.name,
        title: `Category: ${req.params.name.replace(/-/g, ' ')}`
    });
});

// Strona koszyka
app.get('/cart', (req, res) => {
    res.render('cart', { 
        items: [],
        title: 'Your Cart'
    });
});

// API health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        productsCount: products.length,
        mode: process.env.CJ_API_KEY && process.env.CJ_API_KEY !== 'your_cj_api_key_here' ? 'live' : 'demo'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {},
        title: 'Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        message: 'Page not found',
        title: '404 - Not Found'
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Nyx Shop is running on http://localhost:${PORT}`);
    console.log(`📦 Total products: ${products.length}`);
    console.log(`🔗 CJ Search results: ${fs.existsSync(path.join(__dirname, 'cj-search-results.json')) ? '✅ loaded' : '❌ not found'}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   - Run 'npm run search' to fetch products from CJ`);
    console.log(`   - Run 'npm run integrate' to import products to Shopify`);
    console.log(`   - Configure .env with CJ and Shopify API keys for full functionality\n`);
});