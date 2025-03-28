//Define defaults
const tickets = require('../controllers/tickets.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = app => {
    var router = require('express').Router();

    //Create Ticket
    router.post('/createticket', tickets.createTicket);

    //Create Many Tickets
    router.post('/createmanytickets', tickets.createManyTickets);

    //Update Ticket
    router.put('/updateticket/:id', tickets.updateTicket);

    //Delete Bulk Tickets
    router.post('/bulkdeletetickets', tickets.bulkDeleteTickets);

    //Recover or Delete Suspended Tickets
    router.get('/recoverordeletesuspendedtickets', tickets.RecoverOrDeleteSuspendedTicket);

    //Export Suspended Tickets
    router.get('/exportsuspendedtickets', tickets.ExportSuspendedTicket);

    //Import Suspended Tickets
    router.post('/importsuspendedticket', upload.single('file'), tickets.ImportSuspendedTicket);

    //Export Tickets
    router.get('/exporttickets', tickets.exportTickets);

    //List Tickets With Comments And Attachments
    router.get('/listticketswithcommentsandattachments', tickets.listTicketsWithCommentsAndAttachments);

    app.use('/tickets', router);
}