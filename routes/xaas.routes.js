//Define defaults
const xaas = require('../controllers/xaas.controller');

module.exports = app => {
    var router = require('express').Router();

    router.get('/listorders', xaas.listOrders);

    router.get('/getorder/:order_id', xaas.getOrder);

    //router.post('/getorderdetails/:order_id', xaas.getOrderDetails);

    //router.post('/getorderid',xaas.getOrderID);

    //router.post('/getshopid/', xaas.getShopID);

    //router.post('/getchannel/', xaas.getChannel);

    router.get('/getigfollowersbyusername/:username', xaas.getIGFollowersByUsername);

    app.use('/xaas', router);
}