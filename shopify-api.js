const axios = require('axios');
const CJDropshippingAPI = require('./cj-api');
require('dotenv').config();

class ShopifyAPI {
    constructor() {
        this.storeUrl = process.env.SHOPIFY_STORE_URL;
        this.accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
        this.apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';
        
        if (!this.storeUrl || !this.accessToken) {
            throw new Error('SHOPIFY_STORE_URL and SHOPIFY_ACCESS_TOKEN are required');
        }

        this.baseUrl = `https://${this.storeUrl}/admin/api/${this.apiVersion}`;
        
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': this.accessToken
            },
            timeout: 30000
        });
    }

    async createProduct(productData) {
        try {
            const shopifyProduct = {
                product: {
                    title: productData.title,
                    body_html: productData.description,
                    vendor: productData.vendor || 'CJ Dropshipping',
                    product_type: productData.category,
                    tags: productData.tags || 'dropshipping, cj',
                    status: 'active',
                    variants: [{
                        price: productData.price,
                        sku: productData.sku,
                        inventory_quantity: productData.inventory || 100,
                        inventory_management: 'shopify',
                        requires_shipping: true,
                        weight: productData.weight || 0.1,
                        weight_unit: 'kg'
                    }],
                    images: productData.images ? productData.images.map(url => ({
                        src: url,
                        alt: productData.title
                    })) : []
                }
            };

            const response = await this.client.post('/products.json', shopifyProduct);
            return response.data.product;
        } catch (error) {
            console.error('Error creating Shopify product:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateProduct(productId, updates) {
        try {
            const response = await this.client.put(`/products/${productId}.json`, {
                product: updates
            });
            return response.data.product;
        } catch (error) {
            console.error('Error updating Shopify product:', error.response?.data || error.message);
            throw error;
        }
    }

    async getProductBySku(sku) {
        try {
            const response = await this.client.get(`/products.json`, {
                params: { 
                    sku: sku,
                    limit: 1 
                }
            });
            return response.data.products[0] || null;
        } catch (error) {
            // If it's a 404 error, it means product doesn't exist, which is fine
            if (error.response && error.response.status === 404) {
                return null;
            }
            console.error('Error fetching product by SKU:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateInventory(productId, variantId, quantity) {
        try {
            const response = await this.client.post(`/inventory_levels/adjust.json`, {
                location_id: this.getLocationId(), // You need to set up a location
                inventory_item_id: variantId,
                available_adjustment: quantity
            });
            return response.data;
        } catch (error) {
            console.error('Error updating inventory:', error.response?.data || error.message);
            throw error;
        }
    }

    async getOrders(params = {}) {
        try {
            const response = await this.client.get('/orders.json', { params });
            return response.data.orders;
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
            throw error;
        }
    }

    async fulfillOrder(orderId, fulfillmentData) {
        try {
            const response = await this.client.post(`/orders/${orderId}/fulfillments.json`, {
                fulfillment: fulfillmentData
            });
            return response.data.fulfillment;
        } catch (error) {
            console.error('Error fulfilling order:', error.response?.data || error.message);
            throw error;
        }
    }

    async getLocationId() {
        // In a real implementation, you'd fetch the location ID from Shopify
        // For now, we'll assume a default location or you can set it via env
        return process.env.SHOPIFY_LOCATION_ID || '123456789'; // Replace with actual location ID
    }

    async calculatePrice(wholesalePrice, markupPercentage = 200) {
        // Calculate retail price based on wholesale price and desired markup
        const markup = wholesalePrice * (markupPercentage / 100);
        const retailPrice = wholesalePrice + markup;
        return parseFloat(retailPrice.toFixed(2));
    }

    async convertToShopifyProduct(cjProduct, markupPercentage = 200) {
        // Extract price from CJ product (it's a string in USD)
        const wholesalePrice = parseFloat(cjProduct.sellPrice);
        const retailPrice = await this.calculatePrice(wholesalePrice, markupPercentage);
        
        // Convert USD to PLN (approximate)
        const usdToPln = 4.0; // Adjust based on current exchange rate
        const priceInPln = parseFloat((retailPrice * usdToPln).toFixed(2));

        return {
            title: cjProduct.nameEn || cjProduct.productNameEn,
            description: this.generateDescription(cjProduct),
            vendor: cjProduct.supplierName || 'CJ Dropshipping',
            category: this.mapCategory(cjProduct),
            tags: this.generateTags(cjProduct),
            price: priceInPln,
            sku: cjProduct.sku || cjProduct.productSku,
            inventory: this.getInventory(cjProduct),
            weight: parseFloat(cjProduct.productWeight) / 1000 || 0.1, // Convert g to kg
            images: this.extractImages(cjProduct),
            cjProductId: cjProduct.id,
            cjVariantId: cjProduct.variantId || null
        };
    }

    generateDescription(cjProduct) {
        let description = `<p>${cjProduct.description || 'High quality product from CJ Dropshipping.'}</p>`;
        description += '<ul>';
        description += '<li><strong>Fast Shipping</strong>: From global warehouses</li>';
        description += '<li><strong>Quality Guarantee</strong>: Verified supplier</li>';
        description += '<li><strong>Easy Returns</strong>: 30-day return policy</li>';
        description += '</ul>';
        description += '<p><em>Product sourced via CJ Dropshipping API</em></p>';
        return description;
    }

    mapCategory(cjProduct) {
        // Map CJ categories to Shopify product types
        const categoryMap = {
            'cell phone': 'Phone Accessories',
            'electronics': 'Electronics',
            'camera': 'Photography',
            'power bank': 'Electronics',
            'tripod': 'Photography',
            'lighting': 'Photography'
        };
        
        const categoryName = (cjProduct.threeCategoryName || '').toLowerCase();
        
        for (const [key, value] of Object.entries(categoryMap)) {
            if (categoryName.includes(key)) {
                return value;
            }
        }
        
        return 'General';
    }

    generateTags(cjProduct) {
        const baseTags = ['dropshipping', 'cj', 'imported'];
        const categoryTags = [];
        
        if (cjProduct.threeCategoryName) {
            categoryTags.push(cjProduct.threeCategoryName.toLowerCase().replace(/\s+/g, '-'));
        }
        
        if (cjProduct.twoCategoryName) {
            categoryTags.push(cjProduct.twoCategoryName.toLowerCase().replace(/\s+/g, '-'));
        }
        
        return [...baseTags, ...categoryTags].join(', ');
    }

    extractImages(cjProduct) {
        const images = [];
        
        if (cjProduct.bigImage) {
            images.push(cjProduct.bigImage);
        }
        
        if (cjProduct.variantImage && Array.isArray(cjProduct.variantImage)) {
            cjProduct.variantImage.forEach(img => {
                if (img && !images.includes(img)) {
                    images.push(img);
                }
            });
        }
        
        return images;
    }

    getInventory(cjProduct) {
        // Get total inventory from CJ product
        if (cjProduct.warehouseInventoryNum) {
            return parseInt(cjProduct.warehouseInventoryNum);
        }
        if (cjProduct.totalVerifiedInventory) {
            return parseInt(cjProduct.totalVerifiedInventory);
        }
        return 100; // Default fallback
    }
}

module.exports = ShopifyAPI;