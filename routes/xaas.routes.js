//Define defaults
const xaas = require('../controllers/xaas.controller');

module.exports = app => {
    var router = require('express').Router();

    router.post('/getsampleexternaldata/', xaas.getSampleExternalData);

    app.use('/xaas', router);
}