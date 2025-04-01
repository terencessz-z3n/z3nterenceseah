//Define defaults
const axios = require('axios');
const email = process.env.EMAIL;
const apiToken = process.env.APITOKEN;
const encodedToken = Buffer.from(`${email}/token:${apiToken}`).toString('base64');
const zendeskapiurl = process.env.ZENDESKAPIURL;

//Define the axios config
const axiosConfig = {
    headers: {
        Authorization: `Basic ${encodedToken}`,
    },
};

//Create Ticket
const createTicket = async (req) => {
    const createTicketApi = `${zendeskapiurl}/tickets`;
    const createTicketData = req.ticketData;

    return await axios.post(createTicketApi, createTicketData, axiosConfig);
}

//Create Many Tickets
const createManyTickets = async (req) => {
    const createManyTicketsApi = `${zendeskapiurl}/tickets/create_many`;
    const createManyTicketsData = req.ticketData;

    return await axios.post(createManyTicketsApi, createManyTicketsData, axiosConfig);
}

//Update Ticket
const updateTicket = async (req) => {
    const updateTicketApi = `${zendeskapiurl}/tickets/` + req.params.id;
    const updateTicketData = req.body;

    return await axios.post(updateTicketApi, updateTicketData, axiosConfig);
}

//List Search Tickets
const listSearchTickets = async (req) => {
    const listSearchTicketsApi = `${zendeskapiurl}/search?query=type:ticket tags:automated status:` + req.status + `&sort_by=created_at&sort_order=asc`;

    return await axios.get(listSearchTicketsApi, axiosConfig);
}

//Export Search Tickets
const exportSearchTickets = async (req) => {
    const exportSearchTicketsApi = `${zendeskapiurl}/search.json?query=type:ticket requester:aablo@email.com`;

    return await axios.get(exportSearchTicketsApi, axiosConfig);
}

//List Deleted Tickets
const listDeletedTickets = async () => {
    const listDeletedTicketsApi = `${zendeskapiurl}/deleted_tickets`;

    return await axios.get(listDeletedTicketsApi, axiosConfig);
}

//Bulk Delete Tickets
const bulkDeleteTickets = async (toDeleteTicketIdsString) => {
    const bulkDeleteTicketsApi = `${zendeskapiurl}/tickets/destroy_many?ids=` + toDeleteTicketIdsString;

    return await axios.delete(bulkDeleteTicketsApi, axiosConfig);
}

//Delete Multiple Tickets Permanently
const deleteMultipleTicketsPermanent = async (toDeleteTicketIdsString) => {
    const deleteMultipleTicketsPermanentApi = `${zendeskapiurl}/deleted_tickets/destroy_many?ids=` + toDeleteTicketIdsString;

    return await axios.delete(deleteMultipleTicketsPermanentApi, axiosConfig);
}

//Create Ticket Request
const createRequest = async (req) => {
    const createRequestApi = `${zendeskapiurl}/requests`;
    const createRequestData = req.requestData;

    return await axios.post(createRequestApi, createRequestData, axiosConfig);
}

//List Suspended tickets
const listSuspendedTickets = async (url) => {
    const listSuspendedTicketsApi = url || `${zendeskapiurl}/suspended_tickets?page[size]=1`;

    return await axios.get(listSuspendedTicketsApi, axiosConfig);
};

//Delete Multiple Suspended Tickets
const deleteMultipleSuspendedTickets = async (toDeleteSuspendedTicketIdsString) => {
    const deleteMultipleSuspendedTicketsApi = `${zendeskapiurl}/suspended_tickets/destroy_many?ids=` + toDeleteSuspendedTicketIdsString;

    return await axios.delete(deleteMultipleSuspendedTicketsApi, axiosConfig);
}

//Recover Multiple Suspended Tickets
const recoverMultipleSuspendedTickets = async (toRecoverSuspendedTicketIdsString) => {
    const recoverMultipleSuspendedTicketsApi = `${zendeskapiurl}/suspended_tickets/recover_many?ids=` + toRecoverSuspendedTicketIdsString;

    return await axios.delete(recoverMultipleSuspendedTicketsApi, axiosConfig);
}

//List Comments
const listComments = async (ticketId, nextUrl) => {
    const listCommentsApi = nextUrl || `${zendeskapiurl}/tickets/${ticketId}/comments?page[size]=100`;

    return await axios.get(listCommentsApi, axiosConfig);
}

module.exports = {
    createTicket,
    createManyTickets,
    updateTicket,
    listSearchTickets,
    exportSearchTickets,
    listDeletedTickets,
    bulkDeleteTickets,
    deleteMultipleTicketsPermanent,
    createRequest,
    listSuspendedTickets,
    deleteMultipleSuspendedTickets,
    recoverMultipleSuspendedTickets,
    listComments
}