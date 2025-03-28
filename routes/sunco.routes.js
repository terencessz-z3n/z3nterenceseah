const sunco = require('../controllers/sunco.controller');

module.exports = app => {
    var router = require('express').Router();

    // Webhook
    router.post('/webhook', sunco.webhook);

    // Webhook for non connected Integration
    router.post('/webhookNonConnected', sunco.webhookNonConnected);

    // Create Conversation
    router.post('/createConversation', sunco.createConversation);

    app.use('/sunco', router);
}