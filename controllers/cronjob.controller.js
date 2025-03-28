//Define defaults
const ticket = require('../services/tickets.services');
const nodemailer = require('nodemailer');

//Fetch Tickets with automated Tags
exports.fetchTicketsWithAutomatedTags = async (req, res) => {
    try {
        const fetchTicketsWithAutomatedTags = {
            'status': 'solved',
            'pageSize': 100
        };

        let listSearchTicketsResults = await ticket.listSearchTickets(fetchTicketsWithAutomatedTags);
        let listSearchTicketsResultsStatus = listSearchTicketsResults.status;

        if (listSearchTicketsResultsStatus >= 200 && listSearchTicketsResultsStatus <= 300) {
            let listSearchTicketsResultsData = listSearchTicketsResults.data.results;

            for (data of listSearchTicketsResultsData) {
                console.log(data.tags)
            }
        }
    } catch (error) {
        return res.send(error);
    }
}