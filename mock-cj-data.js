// Mock CJ Dropshipping API data for testing
// This simulates CJ API responses without requiring real API keys

const mockProducts = {
    phoneCases: {
        totalRecords: 147,
        content: [
            {
                id: "PC001",
                nameEn: "Kawaii Anime Cat Phone Case for iPhone 14 Pro Max",
                productNameEn: "Kawaii Anime Cat Phone Case for iPhone 14 Pro Max",
                sku: "PC-ANIME-CAT-IP14PM",
                productSku: "PC-ANIME-CAT-IP14PM",
                bigImage: "https://example.com/images/phone-case-anime-cat.jpg",
                sellPrice: "1.50",
                nowPrice: "1.50",
                discountPrice: "1.20",
                supplierName: "TechCase Factory",
                supplierId: "TC001",
                warehouseInventoryNum: 500,
                totalVerifiedInventory: 500,
                productWeight: 30,
                categoryId: "1001",
                threeCategoryName: "Cell Phone Accessories",
                twoCategoryName: "Phone Cases",
                oneCategoryName: "Mobile Phone Accessories",
                description: "Cute kawaii anime cat design phone case. Made of high-quality TPU material. Provides excellent protection against drops and scratches. Compatible with wireless charging.",
                addMarkStatus: 1,
                listedNum: 3420,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variantImage: ["https://example.com/images/phone-case-anime-cat-1.jpg"],
                variant: [
                    {
                        vid: "V001",
                        variantNameEn: "Pink",
                        variantSku: "PC-ANIME-CAT-IP14PM-PK",
                        variantSellPrice: 1.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 150,
                                cjInventory: 150,
                                stock: [{ stockId: "PL1", inventory: 150 }]
                            }
                        ]
                    },
                    {
                        vid: "V002",
                        variantNameEn: "Blue",
                        variantSku: "PC-ANIME-CAT-IP14PM-BL",
                        variantSellPrice: 1.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 200,
                                cjInventory: 200,
                                stock: [{ stockId: "PL1", inventory: 200 }]
                            }
                        ]
                    }
                ]
            },
            {
                id: "PC002",
                nameEn: "Minimalist Gradient Phone Case for Samsung Galaxy S23",
                productNameEn: "Minimalist Gradient Phone Case for Samsung Galaxy S23",
                sku: "PC-GRADIENT-SGS23",
                productSku: "PC-GRADIENT-SGS23",
                bigImage: "https://example.com/images/phone-case-gradient.jpg",
                sellPrice: "2.00",
                nowPrice: "2.00",
                discountPrice: "1.80",
                supplierName: "CaseMasters Co.",
                supplierId: "CM002",
                warehouseInventoryNum: 800,
                totalVerifiedInventory: 800,
                productWeight: 25,
                categoryId: "1001",
                threeCategoryName: "Cell Phone Accessories",
                twoCategoryName: "Phone Cases",
                oneCategoryName: "Mobile Phone Accessories",
                description: "Elegant minimalist gradient design phone case. Made from polycarbonate material with soft interior lining. Precise cutouts for all ports and buttons.",
                addMarkStatus: 1,
                listedNum: 2890,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V003",
                        variantNameEn: "Purple to Blue",
                        variantSku: "PC-GRADIENT-SGS23-PB",
                        variantSellPrice: 2.00,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 300,
                                cjInventory: 300,
                                stock: [{ stockId: "PL1", inventory: 300 }]
                            }
                        ]
                    }
                ]
            },
            {
                id: "PC003",
                nameEn: "Gaming LED Phone Case with RGB Lights for iPhone",
                productNameEn: "Gaming LED Phone Case with RGB Lights for iPhone",
                sku: "PC-LED-GAMING-IP14",
                productSku: "PC-LED-GAMING-IP14",
                bigImage: "https://example.com/images/phone-case-led-gaming.jpg",
                sellPrice: "3.50",
                nowPrice: "3.50",
                discountPrice: "3.00",
                supplierName: "GamingGear Pro",
                supplierId: "GG003",
                warehouseInventoryNum: 350,
                totalVerifiedInventory: 350,
                productWeight: 45,
                categoryId: "1001",
                threeCategoryName: "Cell Phone Accessories",
                twoCategoryName: "Phone Cases",
                oneCategoryName: "Mobile Phone Accessories",
                description: "Cool gaming phone case with built-in LED lights. Features 7 RGB lighting modes. USB rechargeable. Perfect for gamers and streamers.",
                addMarkStatus: 1,
                listedNum: 1560,
                isVideo: 1,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V004",
                        variantNameEn: "Black (Multi-color LED)",
                        variantSku: "PC-LED-GAMING-IP14-BK",
                        variantSellPrice: 3.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 350,
                                cjInventory: 350,
                                stock: [{ stockId: "PL1", inventory: 350 }]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    ledLights: {
        totalRecords: 89,
        content: [
            {
                id: "LL001",
                nameEn: "18 inch LED Ring Light with Tripod Stand and Phone Holder",
                productNameEn: "18 inch LED Ring Light with Tripod Stand and Phone Holder",
                sku: "LL-RING-18-TP",
                productSku: "LL-RING-18-TP",
                bigImage: "https://example.com/images/led-ringlight-18.jpg",
                sellPrice: "4.50",
                nowPrice: "4.50",
                discountPrice: "3.80",
                supplierName: "PhotoLight Studio",
                supplierId: "PL001",
                warehouseInventoryNum: 420,
                totalVerifiedInventory: 420,
                productWeight: 800,
                categoryId: "2001",
                threeCategoryName: "Photography Lighting",
                twoCategoryName: "Ring Lights",
                oneCategoryName: "Video Lighting",
                description: "Professional 18 inch LED ring light with adjustable brightness and color temperature. Includes tripod stand and phone holder. Perfect for makeup tutorials, vlogging, and live streaming. USB powered, dimmable from 10% to 100%. 3 color modes: warm, cool, and mixed.",
                addMarkStatus: 1,
                listedNum: 5230,
                isVideo: 1,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V005",
                        variantNameEn: "White/Silver",
                        variantSku: "LL-RING-18-TP-WH",
                        variantSellPrice: 4.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 200,
                                cjInventory: 200,
                                stock: [{ stockId: "PL1", inventory: 200 }]
                            }
                        ]
                    },
                    {
                        vid: "V006",
                        variantNameEn: "Black",
                        variantSku: "LL-RING-18-TP-BK",
                        variantSellPrice: 4.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 220,
                                cjInventory: 220,
                                stock: [{ stockId: "PL1", inventory: 220 }]
                            }
                        ]
                    }
                ]
            },
            {
                id: "LL002",
                nameEn: "10 inch Selfie Ring Light with Bluetooth Remote",
                productNameEn: "10 inch Selfie Ring Light with Bluetooth Remote",
                sku: "LL-RING-10-BT",
                productSku: "LL-RING-10-BT",
                bigImage: "https://example.com/images/led-ringlight-10.jpg",
                sellPrice: "3.20",
                nowPrice: "3.20",
                discountPrice: "2.90",
                supplierName: "SelfieGear Direct",
                supplierId: "SG002",
                warehouseInventoryNum: 650,
                totalVerifiedInventory: 650,
                productWeight: 350,
                categoryId: "2001",
                threeCategoryName: "Photography Lighting",
                twoCategoryName: "Ring Lights",
                oneCategoryName: "Video Lighting",
                description: "Compact 10 inch LED ring light perfect for selfies and video calls. Comes with Bluetooth remote for hands-free photos. Three light modes: warm white, natural white, and cool white. Adjustable brightness levels. USB rechargeable.",
                addMarkStatus: 1,
                listedNum: 4180,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V007",
                        variantNameEn: "Rose Gold",
                        variantSku: "LL-RING-10-BT-RG",
                        variantSellPrice: 3.20,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 300,
                                cjInventory: 300,
                                stock: [{ stockId: "PL1", inventory: 300 }]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    tripods: {
        totalRecords: 156,
        content: [
            {
                id: "TP001",
                nameEn: "Flexible Phone Tripod with Wireless Remote and 360° Ball Head",
                productNameEn: "Flexible Phone Tripod with Wireless Remote and 360° Ball Head",
                sku: "TP-FLEX-360-REM",
                productSku: "TP-FLEX-360-REM",
                bigImage: "https://example.com/images/tripod-flexible.jpg",
                sellPrice: "5.80",
                nowPrice: "5.80",
                discountPrice: "4.90",
                supplierName: "StandMaster Inc.",
                supplierId: "SM001",
                warehouseInventoryNum: 280,
                totalVerifiedInventory: 280,
                productWeight: 450,
                categoryId: "3001",
                threeCategoryName: "Camera Tripods",
                twoCategoryName: "Phone Tripods",
                oneCategoryName: "Tripods & Supports",
                description: "Versatile flexible phone tripod with 360° ball head. Includes wireless Bluetooth remote for remote shooting. Can be used as a hand grip, wrapped around objects, or freestanding. Compatible with most smartphones (4.7-7.0 inches). Aluminum alloy construction, lightweight and durable.",
                addMarkStatus: 1,
                listedNum: 3750,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V008",
                        variantNameEn: "Black",
                        variantSku: "TP-FLEX-360-REM-BK",
                        variantSellPrice: 5.80,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 150,
                                cjInventory: 150,
                                stock: [{ stockId: "PL1", inventory: 150 }]
                            }
                        ]
                    },
                    {
                        vid: "V009",
                        variantNameEn: "Blue",
                        variantSku: "TP-FLEX-360-REM-BL",
                        variantSellPrice: 5.80,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 130,
                                cjInventory: 130,
                                stock: [{ stockId: "PL1", inventory: 130 }]
                            }
                        ]
                    }
                ]
            },
            {
                id: "TP002",
                nameEn: "Heavy Duty Aluminum Tripod for Phones and Cameras",
                productNameEn: "Heavy Duty Aluminum Tripod for Phones and Cameras",
                sku: "TP-ALUM-HEAVY",
                productSku: "TP-ALUM-HEAVY",
                bigImage: "https://example.com/images/tripod-aluminum.jpg",
                sellPrice: "8.50",
                nowPrice: "8.50",
                discountPrice: "7.20",
                supplierName: "ProPhoto Equipment",
                supplierId: "PP002",
                warehouseInventoryNum: 180,
                totalVerifiedInventory: 180,
                productWeight: 1200,
                categoryId: "3001",
                threeCategoryName: "Camera Tripods",
                twoCategoryName: "Camera Tripods",
                oneCategoryName: "Tripods & Supports",
                description: "Professional heavy-duty aluminum tripod. Extends from 45cm to 150cm. Built-in spirit level for precise alignment. 3-way pan head with smooth movement. Max load capacity: 3kg. Includes carry bag. Perfect for DSLR cameras, phones, and action cameras.",
                addMarkStatus: 0,
                listedNum: 2890,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V010",
                        variantNameEn: "Silver",
                        variantSku: "TP-ALUM-HEAVY-SV",
                        variantSellPrice: 8.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 100,
                                cjInventory: 100,
                                stock: [{ stockId: "PL1", inventory: 100 }]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    powerBanks: {
        totalRecords: 320,
        content: [
            {
                id: "PB001",
                nameEn: "Cartoon Character Power Bank 10000mAh with LED Display",
                productNameEn: "Cartoon Character Power Bank 10000mAh with LED Display",
                sku: "PB-CARTOON-10K",
                productSku: "PB-CARTOON-10K",
                bigImage: "https://example.com/images/powerbank-cartoon.jpg",
                sellPrice: "4.20",
                nowPrice: "4.20",
                discountPrice: "3.60",
                supplierName: "PowerGift Ltd.",
                supplierId: "PG001",
                warehouseInventoryNum: 550,
                totalVerifiedInventory: 550,
                productWeight: 200,
                categoryId: "4001",
                threeCategoryName: "Power Banks",
                twoCategoryName: "Portable Chargers",
                oneCategoryName: "Chargers & Power Adapters",
                description: "Adorable cartoon character design power bank with 10000mAh capacity. Features LED battery display showing remaining power. Dual USB output (2.1A total), supports simultaneous charging of two devices. Includes USB-C input and micro USB input. Slim and portable design.",
                addMarkStatus: 1,
                listedNum: 4650,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V011",
                        variantNameEn: "Pikachu Yellow",
                        variantSku: "PB-CARTOON-10K-PY",
                        variantSellPrice: 4.20,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 200,
                                cjInventory: 200,
                                stock: [{ stockId: "PL1", inventory: 200 }]
                            }
                        ]
                    },
                    {
                        vid: "V012",
                        variantNameEn: "Hello Kitty Pink",
                        variantSku: "PB-CARTOON-10K-HK",
                        variantSellPrice: 4.20,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 180,
                                cjInventory: 180,
                                stock: [{ stockId: "PL1", inventory: 180 }]
                            }
                        ]
                    },
                    {
                        vid: "V013",
                        variantNameEn: "Minecraft Creeper Green",
                        variantSku: "PB-CARTOON-10K-MC",
                        variantSellPrice: 4.20,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 170,
                                cjInventory: 170,
                                stock: [{ stockId: "PL1", inventory: 170 }]
                            }
                        ]
                    }
                ]
            },
            {
                id: "PB002",
                nameEn: "Transparent Crystal Power Bank with Floating Glitter 5000mAh",
                productNameEn: "Transparent Crystal Power Bank with Floating Glitter 5000mAh",
                sku: "PB-GLITTER-5K",
                productSku: "PB-GLITTER-5K",
                bigImage: "https://example.com/images/powerbank-glitter.jpg",
                sellPrice: "3.50",
                nowPrice: "3.50",
                discountPrice: "2.90",
                supplierName: "SparkleTech",
                supplierId: "ST002",
                warehouseInventoryNum: 720,
                totalVerifiedInventory: 720,
                productWeight: 150,
                categoryId: "4001",
                threeCategoryName: "Power Banks",
                twoCategoryName: "Portable Chargers",
                oneCategoryName: "Chargers & Power Adapters",
                description: "Beautiful transparent power bank with floating glitter inside. 5000mAh capacity. Dual USB output ports. Quick charge 2.0 support. LED indicators show battery level. Perfect accessory for teens and young adults. Makes great gift.",
                addMarkStatus: 1,
                listedNum: 5120,
                isVideo: 0,
                productType: "ORDINARY_PRODUCT",
                variant: [
                    {
                        vid: "V014",
                        variantNameEn: "Rainbow Glitter",
                        variantSku: "PB-GLITTER-5K-RB",
                        variantSellPrice: 3.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 250,
                                cjInventory: 250,
                                stock: [{ stockId: "PL1", inventory: 250 }]
                            }
                        ]
                    },
                    {
                        vid: "V015",
                        variantNameEn: "Blue Glitter",
                        variantSku: "PB-GLITTER-5K-BL",
                        variantSellPrice: 3.50,
                        inventories: [
                            {
                                countryCode: "PL",
                                totalInventory: 240,
                                cjInventory: 240,
                                stock: [{ stockId: "PL1", inventory: 240 }]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// Global warehouses (mock)
const mockWarehouses = [
    {
        areaId: 1,
        areaEn: "China Warehouse",
        areaCn: "中国仓",
        countryCode: "CN",
        nameEn: "China",
        valueEn: "CN",
        disabled: false
    },
    {
        areaId: 2,
        areaEn: "Poland Warehouse",
        areaCn: "波兰仓",
        countryCode: "PL",
        nameEn: "Poland",
        valueEn: "PL",
        disabled: false
    },
    {
        areaId: 3,
        areaEn: "Germany Warehouse",
        areaCn: "德国仓",
        countryCode: "DE",
        nameEn: "Germany",
        valueEn: "DE",
        disabled: false
    }
];

// Categories (mock)
const mockCategories = {
    success: true,
    categoryFirstList: [
        {
            categoryFirstName: "Electronics",
            categoryFirstList: [
                {
                    categorySecondName: "Mobile Phone Accessories",
                    categorySecondList: [
                        { categoryId: "1001", categoryName: "Cell Phone Accessories" },
                        { categoryId: "1002", categoryName: "Tablet Accessories" }
                    ]
                }
            ]
        }
    ]
};

// Export for use in tests
module.exports = {
    mockProducts,
    mockWarehouses,
    mockCategories
};

// If run directly, print sample output
if (require.main === module) {
    console.log("Mock CJ Data loaded!");
    console.log(`Total phone cases: ${mockProducts.phoneCases.totalRecords}`);
    console.log(`Total LED lights: ${mockProducts.ledLights.totalRecords}`);
    console.log(`Total tripods: ${mockProducts.tripods.totalRecords}`);
    console.log(`Total power banks: ${mockProducts.powerBanks.totalRecords}`);
    console.log(`Warehouses: ${mockWarehouses.length}`);
}