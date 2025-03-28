const customobject = require('../controllers/customobject.controller');

module.exports = app => {
    var router = require('express').Router();

    //List Custom Objects
    router.get('/listcustomobjects', customobject.listCustomObjects);

    app.use('/customobjects', router);
}