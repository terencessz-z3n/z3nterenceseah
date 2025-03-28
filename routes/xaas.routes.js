//Define defaults
const xaas = require('../controllers/xaas.controller');

module.exports = app => {
    var router = require('express').Router();

    router.get('/getqualtricssurvey/:order_id', xaas.getQualtricsSurvey);

    router.put('/topdeskupdateticket/:id', xaas.updateTopDeskTicket);

    router.post('/getsampleexternaldata/', xaas.getSampleExternalData);

    app.use('/xaas', router);
}