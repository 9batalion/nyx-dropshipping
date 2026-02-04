const axios = require('axios');
require('dotenv').config();

class CJDropshippingAPI {
    constructor() {
        this.apiKey = process.env.CJ_API_KEY;
        this.baseUrl = process.env.CJ_API_BASE_URL || 'https://developers.cjdropshipping.com/api2.0/v1';
        
        if (!this.apiKey) {
            throw new Error('CJ_API_KEY is not set in environment variables');
        }

        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            timeout: 30000
        });
    }

    async getCategories() {
        try {
            const response = await this.client.get('/product/getCategory');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error.response?.data || error.message);
            throw error;
        }
    }

    async searchProducts(params) {
        try {
            const response = await this.client.get('/product/listV2', { params });
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error.response?.data || error.message);
            throw error;
        }
    }

    async getProductDetails(pid, features = ['enable_description', 'enable_category', 'enable_combine', 'enable_video']) {
        try {
            const response = await this.client.get('/product/query', {
                params: { pid, features: features.join(',') }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching product details:', error.response?.data || error.message);
            throw error;
        }
    }

    async addToMyProducts(productId) {
        try {
            const response = await this.client.post('/product/addToMyProduct', {
                productId
            });
            return response.data;
        } catch (error) {
            console.error('Error adding product to My Products:', error.response?.data || error.message);
            throw error;
        }
    }

    async getMyProducts(params = {}) {
        try {
            const response = await this.client.get('/product/myProduct/query', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching My Products:', error.response?.data || error.message);
            throw error;
        }
    }

    async getInventoryBySku(sku) {
        try {
            const response = await this.client.get('/product/stock/queryBySku', {
                params: { sku }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory by SKU:', error.response?.data || error.message);
            throw error;
        }
    }

    async getInventoryByPid(pid) {
        try {
            const response = await this.client.get('/product/stock/getInventoryByPid', {
                params: { pid }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory by product ID:', error.response?.data || error.message);
            throw error;
        }
    }

    async getGlobalWarehouses() {
        try {
            const response = await this.client.get('/product/globalWarehouseList');
            return response.data;
        } catch (error) {
            console.error('Error fetching global warehouses:', error.response?.data || error.message);
            throw error;
        }
    }

    async searchPhoneCases(keyword, countryCode = 'PL', maxPrice = 5) {
        return await this.searchProducts({
            keyWord: keyword,
            countryCode,
            startSellPrice: 0,
            endSellPrice: maxPrice,
            page: 1,
            size: 20,
            sort: 'desc',
            orderBy: 'listedNum',
            features: ['enable_description', 'enable_category']
        });
    }

    async searchLEDLights(keyword, countryCode = 'PL', maxPrice = 8) {
        return await this.searchProducts({
            keyWord: keyword,
            countryCode,
            startSellPrice: 0,
            endSellPrice: maxPrice,
            page: 1,
            size: 20,
            sort: 'desc',
            orderBy: 'listedNum'
        });
    }

    async searchTripods(keyword, countryCode = 'PL', maxPrice = 10) {
        return await this.searchProducts({
            keyWord: keyword,
            countryCode,
            startSellPrice: 0,
            endSellPrice: maxPrice,
            page: 1,
            size: 20,
            sort: 'desc',
            orderBy: 'listedNum'
        });
    }

    async searchPowerBanks(keyword, countryCode = 'PL', maxPrice = 10) {
        return await this.searchProducts({
            keyWord: keyword,
            countryCode,
            startSellPrice: 0,
            endSellPrice: maxPrice,
            page: 1,
            size: 20,
            sort: 'desc',
            orderBy: 'listedNum'
        });
    }
}

module.exports = CJDropshippingAPI;