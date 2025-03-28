//Define defaults
const auth = require('../controllers/authentication.controller');

module.exports = app => {
    var router = require('express').Router();

    //Authenticate User
    router.post('/', auth.authenticate);

    //Mutli-Brand Authenticate User
    router.post('/multibrandauth', auth.multiBrandAuthenticate);

    //JWT SSO Authenticate User
    router.post('/jwtsso', auth.jwtsso);

    //Help Center Authenticate User for Messaging Web Widget
    router.get('/hcmessagingauth', auth.helpCenterMessagingAuth);

    app.use('/auth', router);
}