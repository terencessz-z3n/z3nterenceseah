const url = require('url');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const axios = require('axios');
const jwtSharedKey = process.env.JWTSHAREDKEY;
const zendeskURL = process.env.ZENDESKURL

exports.listOrders = async (req, res) => {
    res.send({
        "response_code": "200",
        "result": {
            "orders": [
                {
                    "order_id": "12345",
                    "order_status": "Delivered",
                    "order_grand_total": "SGD 1000"
                },
                {
                    "order_id": "67890",
                    "order_status": "Pending",
                    "order_grand_total": "SGD 500"
                }
            ]
        }
    })
}

exports.getOrder = async (req, res) => {
    res.send({
        "response_code": "200",
        "result": {
            "order_id": "12345",
            "order_status": "Delivered",
            "order_grand_total": "SGD 1000"
        }
    })
}

/*
exports.getOrderDetails = async (req, res) => {
    console.log(req.body.order_id);
    res.send({
        "response_type": "200",
        "result": {
            "order_information": {
                "order_no": "12345",
                "order_date": "Apr 19 2025 13:30"
            },
            "delivery_status": "Delivered",
            "buyer_information": {
                "customer_name": "user 1",
                "customer_id": "12345676899",
                "customer_phone": "1234567890",
                "payment_method": "COD"
            },
            "shipping_billing_address": {
                "shipping_address": {
                    "detail_address": "Kab Malang Indonesia",
                    "receiver_name": "user 1",
                    "receiver_phone_number": "1234567890"
                },
                "billing_address": {
                    "detail_address": "Kab Malang Indonesia",
                    "receiver_name": "user 1",
                    "receiver_phone_number": "1234567890"
                }
            },
            "buyer_payment_information": {
                "subtotal": "IDR 250000.00",
                "shipping_fee": "IDR 0.00",
                "lazada_total_discount": "IDR -2500.00",
                "seller_discount_total": "IDR -4320.00",
                "total_amount_adjusted": "IDR -31320.00",
                "grand_total": "IDR 243180.00"
            },
            "last_known_tracking_location": "location 123",
            "order_product_items": [
                {
                    "sku": "SKU-SKINTIFIC-39+183",
                    "product_name": "Skintific - Day Cream Night Cream Symwhite 377 Dark Spot Moisture Gel 30g + Retinol Skin Renewal Moisturizer 30g | Pelembab Wajah Serum Wajah Anti-Aging Dark Spot Brightening Glowing with Acid",
                    "product_variation": "Moisturizer Set",
                    "product_item_id": "14760756803",
                    "product_amount": "IDR 243180.00"
                },
                {
                    "sku": "SKU-SKINTIFIC-39+183",
                    "product_name": "Skintific - Day Cream Night Cream Symwhite 377 Dark Spot Moisture Gel 30g + Retinol Skin Renewal Moisturizer 30g | Pelembab Wajah Serum Wajah Anti-Aging Dark Spot Brightening Glowing with Acid",
                    "product_variation": "Moisturizer Set",
                    "product_item_id": "14760756803",
                    "product_amount": "IDR 243180.00"
                }
            ]
            }
    })
}

exports.getOrderID = async (req, res) => {
    res.send({
        "response_code": "200",
        "fruits": ["apple", "banana", "cherry"],
        "result": {
            "order_id": req.body.order_id,
        }
    })
}

exports.getShopID = async (req, res) => {
    res.send({
        "response_code": "200",
        "result": {
            "shop_id": req.body.shop_id
        }
    })
}

exports.getChannel = async (req, res) => {
    res.send({
        "response_code": "200",
        "result": {
            "channel": req.body.channel
        }
    })
}
*/

exports.getIGFollowersByUsername = async (req, res) => {
    const APIFY_TOKEN = 'apify_api_fnpcbQkUO6XBJGg97QxfPdAfFBXWYG3jhKe2';
    const { username } = req.params;

    try {
        const runResponse = await axios.post(
            `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
            {
                usernames: [username],
                resultsLimit: 1,
            }
        );

        const user = runResponse.data[0];

        if (!user || typeof user.followersCount !== 'number') {
            return res.status(404).json({ error: 'Profile not found or private' });
        }

        res.json({
            username: user.username,
            fullName: user.fullName,
            followerCount: user.followersCount,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch profile',
            details: error.response?.data || error.message,
        });
    }
}
