const { mockProducts } = require('./mock-cj-data');
const fs = require('fs');

async function searchAllProducts() {
    const useMock = !process.env.CJ_API_KEY || process.env.CJ_API_KEY === 'your_cj_api_key_here';
    
    console.log('🔍 Searching for products in CJ Dropshipping...\n');
    console.log(`🔧 Configuration: ${useMock ? '🔶 Mock Mode' : '✅ Real API'}`);
    
    try {
        let phoneCases, ledLights, tripods, powerBanks;
        
        if (useMock) {
            console.log('⚠️  Using mock data (no CJ_API_KEY provided)');
            phoneCases = mockProducts.phoneCases;
            ledLights = mockProducts.ledLights;
            tripods = mockProducts.tripods;
            powerBanks = mockProducts.powerBanks;
        } else {
            // Dynamic import only if we have real API key
            const CJDropshippingAPI = require('./cj-api');
            const cj = new CJDropshippingAPI();
            
            console.log('📱 Searching for phone cases...');
            phoneCases = await cj.searchPhoneCases('phone case anime');
            console.log(`Found ${phoneCases.totalRecords} phone cases`);
            
            console.log('\n💡 Searching for LED selfie lights...');
            ledLights = await cj.searchLEDLights('LED ring light selfie');
            console.log(`Found ${ledLights.totalRecords} LED lights`);
            
            console.log('\n📷 Searching for phone tripods...');
            tripods = await cj.searchTripods('phone tripod flexible');
            console.log(`Found ${tripods.totalRecords} tripods`);
            
            console.log('\n🔋 Searching for power banks...');
            powerBanks = await cj.searchPowerBanks('power bank funny toy');
            console.log(`Found ${powerBanks.totalRecords} power banks`);
        }
        
        // Save results to files
        const results = {
            phoneCases: phoneCases,
            ledLights: ledLights,
            tripods: tripods,
            powerBanks: powerBanks,
            timestamp: new Date().toISOString(),
            source: useMock ? 'mock' : 'api'
        };
        
        fs.writeFileSync('cj-search-results.json', JSON.stringify(results, null, 2));
        console.log('\n✅ Results saved to cj-search-results.json');
        
        // Display top products
        console.log('\n🏆 Top 3 products from each category:');
        
        function displayTopProducts(products, label) {
            const content = products.content || products;
            if (content && content.length > 0) {
                console.log(`\n${label}:`);
                content.slice(0, 3).forEach((product, idx) => {
                    console.log(`  ${idx + 1}. ${product.nameEn} - $${product.sellPrice} (${product.supplierName})`);
                });
            }
        }
        
        displayTopProducts(phoneCases, '📱 Phone Cases');
        displayTopProducts(ledLights, '💡 LED Lights');
        displayTopProducts(tripods, '📷 Tripods');
        displayTopProducts(powerBanks, '🔋 Power Banks');
        
    } catch (error) {
        console.error('❌ Error during product search:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the search
searchAllProducts().then(() => {
    console.log('\n✨ Search completed!');
    console.log('📝 Next steps:');
    console.log('   1. Run: npm run integrate (to import products to Shopify)');
    console.log('   2. Start server: npm start');
    console.log('   3. Visit: http://localhost:3000');
    process.exit(0);
}).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});