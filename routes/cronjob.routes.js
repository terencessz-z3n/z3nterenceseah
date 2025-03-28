//Define defaults
const cronjobs = require('../controllers/cronjob.controller');

module.exports = app => {
    var router = require('express').Router();

    //Fetch Tickets with automated Tags
    router.get('/fetchticketswithautomatedtags', cronjobs.fetchTicketsWithAutomatedTags);

    app.use('/cronjob', router);
}