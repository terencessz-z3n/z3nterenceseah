const sunco = require('../services/sunco.services');

//Webhook
exports.webhook = async (req, res) => {
    try {
        console.log('Sunco Webhook Payload:\n', JSON.stringify(req.body, null, 4));
        const payload = req.body;
        const content = payload.events[0].payload.message.content.text.toLowerCase();

        if (content === 'talk to an agent') {
            await sunco.passControl(payload);
        } else {
            await sunco.postMessage(payload);
        }
        res.end();
    } catch (error) {
        return res.send(error);
    }
}

exports.webhookNonConnected = async (req, res) => {
    //console.log('Sunco Webhook Payload:\n', JSON.stringify(req.body, null, 4));
}

exports.createConversation = async (req, res) => {
    try {
        let payload = req.body;

        await sunco.createConversation(payload);

        res.end();
    } catch (error) {
        return res.send(error);
    }
}