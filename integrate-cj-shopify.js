const CJDropshippingAPI = require('./cj-api');
const ShopifyAPI = require('./shopify-api');
const fs = require('fs');
const { mockProducts } = require('./mock-cj-data');

class IntegrationManager {
    constructor() {
        this.cj = new CJDropshippingAPI();
        this.shopify = new ShopifyAPI();
        this.importLog = [];
        this.useMock = !process.env.CJ_API_KEY || process.env.CJ_API_KEY === 'your_cj_api_key_here';
    }

    async importProductFromCJ(cjProduct, options = {}) {
        const {
            markupPercentage = 200,
            addToMyProducts = true,
            publish = true
        } = options;

        try {
            console.log(`\n📦 Processing product: ${cjProduct.nameEn || cjProduct.productNameEn}`);
            
            // Convert CJ product to Shopify format
            const shopifyProductData = await this.shopify.convertToShopifyProduct(
                cjProduct, 
                markupPercentage
            );
            
            console.log(`   ℹ️  SKU: ${shopifyProductData.sku}`);
            console.log(`   ℹ️  Price: $${cjProduct.sellPrice} → ${shopifyProductData.price} PLN`);
            console.log(`   ℹ️  Inventory: ${shopifyProductData.inventory}`);
            
            // If Shopify credentials are valid, try to actually create/update product
            let shopifyProduct = null;
            
            try {
                // Test if Shopify connection works
                await this.shopify.getProductBySku(shopifyProductData.sku);
                
                // Check if product already exists in Shopify (by SKU)
                // Note: This will fail if no valid credentials, but that's okay
                const existingProduct = await this.shopify.getProductBySku(shopifyProductData.sku);
                
                if (existingProduct) {
                    console.log(`   ℹ️  Product already exists in Shopify (ID: ${existingProduct.id})`);
                    
                    if (publish) {
                        await this.shopify.updateProduct(existingProduct.id, {
                            variants: [{
                                id: existingProduct.variants[0].id,
                                price: shopifyProductData.price,
                                inventory_quantity: shopifyProductData.inventory
                            }]
                        });
                        console.log(`   ✅ Updated existing product`);
                    }
                    
                    shopifyProduct = existingProduct;
                    this.logImport(cjProduct.id, existingProduct.id, 'existing');
                } else {
                    // Create new product in Shopify
                    shopifyProduct = await this.shopify.createProduct(shopifyProductData);
                    console.log(`   ✅ Created new Shopify product (ID: ${shopifyProduct.id})`);
                    this.logImport(cjProduct.id, shopifyProduct.id, 'created');
                }
            } catch (shopifyError) {
                // If Shopify credentials are not valid or API fails
                if (!process.env.SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN === 'your_shopify_access_token') {
                    console.log(`   ⚠️  Shopify credentials not configured - product would be created here`);
                    console.log(`   📋 Product data prepared for Shopify import:`);
                    console.log(`      - Title: ${shopifyProductData.title}`);
                    console.log(`      - Price: ${shopifyProductData.price} PLN`);
                    console.log(`      - SKU: ${shopifyProductData.sku}`);
                    console.log(`      - Inventory: ${shopifyProductData.inventory}`);
                    console.log(`      - Category: ${shopifyProductData.category}`);
                    
                    this.logImport(cjProduct.id, null, 'skipped_no_shopify_creds');
                } else {
                    throw shopifyError; // Re-throw if we have creds but API failed
                }
            }
            
            return shopifyProduct || { simulated: true, ...cjProduct };
            
        } catch (error) {
            console.error(`   ❌ Error importing product:`, error.message);
            this.logImport(cjProduct.id, null, 'error', error.message);
            return null;
        }
    }

    async importMultipleProducts(cjProducts, options = {}) {
        console.log(`\n🚀 Starting import of ${cjProducts.length} products to Shopify...\n`);
        
        const results = [];
        for (const product of cjProducts) {
            const result = await this.importProductFromCJ(product, options);
            if (result) {
                results.push(result);
            }
            // Small delay to avoid rate limiting
            await this.sleep(1000);
        }
        
        console.log(`\n✨ Import completed! Successfully processed ${results.length} out of ${cjProducts.length} products.`);
        return results;
    }

    async importFromSearchResults(searchResults, options = {}) {
        const allProducts = [];
        
        // Handle both real API results format and mock format
        const getContent = (result) => {
            if (result.content) return result.content;
            // Mock format may have different structure
            return [result];
        };
        
        if (searchResults.phoneCases) {
            const content = getContent(searchResults.phoneCases);
            if (Array.isArray(content)) allProducts.push(...content);
            else allProducts.push(content);
        }
        if (searchResults.ledLights) {
            const content = getContent(searchResults.ledLights);
            if (Array.isArray(content)) allProducts.push(...content);
            else allProducts.push(content);
        }
        if (searchResults.tripods) {
            const content = getContent(searchResults.tripods);
            if (Array.isArray(content)) allProducts.push(...content);
            else allProducts.push(content);
        }
        if (searchResults.powerBanks) {
            const content = getContent(searchResults.powerBanks);
            if (Array.isArray(content)) allProducts.push(...content);
            else allProducts.push(content);
        }
        
        // If we have direct arrays (from mock), use them
        if (allProducts.length === 0) {
            if (Array.isArray(searchResults.phoneCases)) allProducts.push(...searchResults.phoneCases);
            if (Array.isArray(searchResults.ledLights)) allProducts.push(...searchResults.ledLights);
            if (Array.isArray(searchResults.tripods)) allProducts.push(...searchResults.tripods);
            if (Array.isArray(searchResults.powerBanks)) allProducts.push(...searchResults.powerBanks);
        }
        
        // Sort by popularity (listedNum) and take top N
        allProducts.sort((a, b) => (b.listedNum || 0) - (a.listedNum || 0));
        
        const selectedProducts = allProducts.slice(0, options.maxProducts || 10);
        
        return await this.importMultipleProducts(selectedProducts, options);
    }

    async syncInventoryFromCJ() {
        console.log('\n🔄 Starting inventory sync from CJ to Shopify...');
        
        // In a real implementation, you would:
        // 1. Get all products from Shopify that have CJ product IDs stored as metafields
        // 2. For each product, query CJ for current inventory
        // 3. Update Shopify inventory levels
        
        console.log('⚠️  Inventory sync requires storing CJ product references in Shopify metafields.');
        console.log('   This would be implemented in a production version.');
        
        if (this.useMock) {
            console.log('   (Mock) Would sync inventory for all products...');
        }
    }

    async processShopifyOrders() {
        console.log('\n📋 Checking for new Shopify orders...');
        
        try {
            // Fetch recent orders
            const orders = await this.shopify.getOrders({
                status: 'unfulfilled',
                created_at_min: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            });
            
            console.log(`Found ${orders.length} unfulfilled orders.`);
            
            for (const order of orders) {
                console.log(`\n📦 Order #${order.name} (${order.email})`);
                
                // Process each line item
                for (const item of order.line_items) {
                    console.log(`  - ${item.quantity}x ${item.title} (SKU: ${item.sku})`);
                    
                    // In a real implementation, you would:
                    // 1. Find the corresponding CJ product ID (stored in metafield)
                    // 2. Create a sourcing order in CJ
                    // 3. Update Shopify with tracking information
                }
                
                console.log(`  ⚠️  Order would be sent to CJ for fulfillment`);
            }
            
        } catch (error) {
            // If Shopify credentials are not set, just show message
            if (!process.env.SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN === 'your_shopify_access_token') {
                console.log('   ⚠️  Shopify credentials not configured - would process orders here');
            } else {
                console.error('Error processing orders:', error.message);
            }
        }
    }

    logImport(cjProductId, shopifyProductId, status, error = null) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            cjProductId,
            shopifyProductId,
            status,
            error
        };
        
        this.importLog.push(logEntry);
        
        // Save to file
        fs.writeFileSync(
            'import-log.json', 
            JSON.stringify(this.importLog, null, 2)
        );
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runFullImport() {
        console.log('🚀 Starting full integration process...\n');
        console.log(`🔧 Configuration:`);
        console.log(`   - CJ API: ${this.useMock ? '🔶 Mock Mode (no API key)' : '✅ Real API'}`);
        console.log(`   - Shopify API: ${process.env.SHOPIFY_ACCESS_TOKEN && process.env.SHOPIFY_ACCESS_TOKEN !== 'your_shopify_access_token' ? '✅ Configured' : '🔶 Not configured'}`);
        
        try {
            // Load search results from CJ
            let searchResults;
            
            try {
                searchResults = JSON.parse(fs.readFileSync('cj-search-results.json', 'utf8'));
                console.log('\n📂 Loaded previous search results.');
            } catch (err) {
                console.log('\n📂 No previous search results found. Running new search...');
                
                if (this.useMock) {
                    // Use mock data directly
                    searchResults = mockProducts;
                } else {
                    // Run real search
                    console.log('Running product search... (this may take a few minutes)');
                    // This would be implemented if we had real API
                    throw new Error('Please run search-products.js first to get product data');
                }
            }
            
            // Import products to Shopify
            await this.importFromSearchResults(searchResults, {
                markupPercentage: 200,
                maxProducts: 5, // Import top 5 from each category for testing
                publish: true
            });
            
            // Show inventory sync instructions
            console.log('\n📝 Note: Full inventory sync requires Shopify metafields setup.');
            console.log('   For now, manually update inventory in CJ and refresh Shopify products.');
            
            if (!this.useMock) {
                // Process pending orders
                await this.processShopifyOrders();
            } else {
                console.log('\n📦 Mock mode: Would process Shopify orders here...');
            }
            
            console.log('\n✅ Integration process completed!');
            console.log('📄 Check import-log.json for detailed results.');
            
            if (this.useMock) {
                console.log('\n💡 To use real CJ API:');
                console.log('   1. Get API key from https://developers.cjdropshipping.com/');
                console.log('   2. Add to .env: CJ_API_KEY=your_key');
                console.log('   3. Run: npm run search');
                console.log('   4. Get Shopify API credentials and add to .env');
                console.log('   5. Run: npm run integrate');
            }
            
        } catch (error) {
            console.error('❌ Full import failed:', error.message);
        }
    }
}

// Run if called directly
if (require.main === module) {
    const integration = new IntegrationManager();
    integration.runFullImport().then(() => {
        process.exit(0);
    }).catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
}

module.exports = IntegrationManager;