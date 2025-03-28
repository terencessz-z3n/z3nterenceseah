const url = require('url');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const jwtSharedKey = process.env.JWTSHAREDKEY;
const zendeskURL = process.env.ZENDESKURL

exports.getQualtricsSurvey = async (req, res) => {
    console.log(req.params.order_id)
    let order_id = req.params.order_id;

    if (order_id === "123") {
        console.log("Order ID: " + order_id)
        res.send({
            q_name: "",
            q_email: ""
        })
    } else if (order_id === "456") {
        console.log("Order ID: " + order_id)
        res.send({
            q_name: "Aablo",
            q_email: "aablo@email.com"
        })
    }
};

exports.updateTopDeskTicket = async (req, res) => {
    console.log("ID: " + req.params.id)
    console.log("Body: " + req.body);

    // Implement TOPdesk update incident by passing in the req.params.id which represent the custom field that holds the incident ID
}

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