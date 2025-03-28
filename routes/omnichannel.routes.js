const omnichannel = require('../controllers/omnichannel.controller');

module.exports = app => {
    var router = require('express').Router();

    //List Custom Objects
    router.get('/agentavailability', omnichannel.agentAvailability);

    app.use('/omnichannel', router);
}