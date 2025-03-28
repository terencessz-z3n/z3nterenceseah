//Define defaults
const users = require('../controllers/users.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = app => {
    var router = require('express').Router();

    //Create User
    router.post('/createuser', users.createUser);

    //List Users
    router.get('/listuser', users.listUsers);

    //Show User
    router.get('/showuser/:id', users.showUser);

    //Show User by Email
    router.post('/showuserbyemail', users.showUserByEmail);

    //Update User
    router.put('/updateuser/:id', users.updateUser);

    //Webhook
    router.post('/webhook', users.webhook);

    //Bulk update agents with csv
    router.post('/bulkupdateagents', upload.single('file'), users.bulkUpdateAgents);

    app.use('/users', router);
}