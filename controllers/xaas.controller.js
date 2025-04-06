const url = require('url');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const jwtSharedKey = process.env.JWTSHAREDKEY;
const zendeskURL = process.env.ZENDESKURL

exports.getSampleExternalData = async (req, res) => {
    const email = req.body.email;
    console.log(email)

    if (email === "kyc2@email.com") {
        res.send({
            "response_code": "200",
            "result": {
                "kyc_score": "KYC2",
                "asset": "yes"
            }
        })
    }
    else if (email === "kyc1@email.com") {
        res.send({
            "response_code": "200",
            "result": {
                "kyc_score": "KYC1",
                "asset": "yes"
            }
        })
    }
    else if (email === "kyc0@email.com") {
        res.send({
            "response_code": "200",
            "result": {
                "kyc_score": "KYC0",
                "asset": "yes"
            }
        })
    }
    else if (email === "kyc0na@email.com") {
        res.send({
            "response_code": "200",
            "result": {
                "kyc_score": "KYC0",
                "asset": "no"
            }
        })
    }
    else {
        res.send({
            "response_code": "404",
            "result": {
            }
        })
    }
}