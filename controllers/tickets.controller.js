//Define defaults
const ticket = require('../services/tickets.services');
const job = require('../services/jobs.services');
const { Parser } = require('json2csv');
const fs = require('fs');
const csv = require('csvtojson');

const pause = () => {
    console.info('Pausing...');
    return new Promise(resolve => setTimeout(() => {
        resolve();
    }, 15000));
};

const handle40XError = async (errorStatus) => {
    console.info('Error (' + errorStatus + ') encountered. Pausing before retrying.');
    await pause();
    return true;
}

const handle429Error = async (retryAfter) => {
    const secondsToWait = Number(retryAfter);
    console.info('Too Many Requests (429) encountered. Pausing for ' + secondsToWait + ' seconds before retrying.');
    await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000));

    return true;
}

//Create Ticket
exports.createTicket = async (req, res) => {
    try {
        let ticketData = {
            "ticket": {
                "subject": "Ticket Test from API",
                "priority": "normal",
                "status": "open",
                "requester": {
                    "name": "Aablo",
                    "email": "aablo@email.com"
                },
                "comment": {
                    "body": "This is a test ticket with attachment.",
                    "uploads": ["uCScyW4ONQopnNZ8T39hp6LzJ"]
                },
                "tags": [
                    "test"
                ]
            }
        }

        req.ticketData = ticketData;

        const createTicketResult = await ticket.createTicket(req);
        const createTicketResultStatus = createTicketResult.status;

        if (createTicketResultStatus >= 200 && createTicketResultStatus <= 300) {
            return res.status(createTicketResultStatus).send(createTicketResult);
        }
    } catch (error) {
        return res.send(error);
    }
}

//Create Many Tickets
exports.createManyTickets = async (req) => {
    while (true) {
        try {
            let ticketData = {
                "tickets": [
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    },
                    {
                        "comment": {
                            "body": "The smoke is very colorful."
                        },
                        "priority": "urgent",
                        "status": "open",
                        "requester": {
                            "name": "Aablo",
                            "email": "aablo@email.com"
                        },
                        "subject": "My printer is on fire!"
                    }
                ]
            }

            req.ticketData = ticketData;

            const createManyTicketsResult = await ticket.createManyTickets(req);
            const createManyTicketsResultStatus = createManyTicketsResult.status;

            if (createManyTicketsResultStatus >= 200 && createManyTicketsResultStatus <= 300) {
                console.log("Creating Many Tickets")
            }
        } catch (error) {
            let errorStatus = error.response.status;
            let retryAfter = error.response.headers['retry-after'];
            console.error("Error encountered: " + errorStatus);

            if (errorStatus === 429) {
                if (await handle429Error(retryAfter)) {
                    continue;
                }
            }
        }
    }
}

//Update Ticket
exports.updateTicket = async (req, res) => {
    let ticketId = req.param.id;
    let requestBody = req.body;

    console.log(ticketId)
    console.log(requestBody)

    try {
        const updateTicketResult = await ticket.updateTicket(req);
        const updateTicketResultStatus = updateTicketResult.status;

        if (updateTicketResultStatus >= 200 && updateTicketResultStatus <= 300) {
            return res.status(updateTicketResultStatus).send(updateTicketResult);
        }
    } catch (error) {
        return res.send(error);
    }
}

//List Tickets
exports.exportTickets = async () => {
    let ticketsToExport = [];
    let nextUrl = "";

    try {
        do {
            const listTicketsResult = await ticket.exportSearchTickets(nextUrl);
            const listTicketsResultStatus = listTicketsResult.status;

            if (listTicketsResultStatus >= 200 && listTicketsResultStatus < 300) {
                const currentDateTime = new Date().toISOString();
                const has_more = listTicketsResult.data.meta.has_more;
                nextUrl = has_more ? listTicketsResult.data.links.next : null;

                console.log(`[${currentDateTime}] Has more results: ` + has_more);

                ticketsToExport = ticketsToExport.concat(listTicketsResult.data.results);
            } else {
                console.error(`Error fetching tickets: ${listTicketsResultStatus}`);
                nextUrl = null;
            }
        } while (nextUrl);

        console.log("Initial tickets data:", JSON.stringify(ticketsToExport, null, 2));

        const transformedData = ticketsToExport.map((ticket, index) => ({
            row_count: index + 1,
            url: ticket.url || "",
            id: ticket.id || "",
            external_id: ticket.external_id || "",
            via_channel: ticket.via ? (ticket.via.channel || "") : "",
            via_source_from: JSON.stringify(ticket.via ? ticket.via.source.from : {}),
            via_source_to: JSON.stringify(ticket.via ? ticket.via.source.to : {}),
            via_source_rel: ticket.via ? ticket.via.source.rel || "" : "",
            created_at: ticket.created_at || "",
            updated_at: ticket.updated_at || "",
            generated_timestamp: ticket.generated_timestamp || "",
            type: ticket.type || "",
            subject: ticket.subject || "",
            raw_subject: ticket.raw_subject || "",
            description: ticket.description || "",
            priority: ticket.priority || "",
            status: ticket.status || "",
            recipient: ticket.recipient || "",
            requester_id: ticket.requester_id || "",
            submitter_id: ticket.submitter_id || "",
            assignee_id: ticket.assignee_id || "",
            organization_id: ticket.organization_id || "",
            group_id: ticket.group_id || "",
            collaborator_ids: ticket.collaborator_ids ? ticket.collaborator_ids.join(';') : "",
            follower_ids: ticket.follower_ids ? ticket.follower_ids.join(';') : "",
            email_cc_ids: ticket.email_cc_ids ? ticket.email_cc_ids.join(';') : "",
            forum_topic_id: ticket.forum_topic_id || "",
            problem_id: ticket.problem_id || "",
            has_incidents: ticket.has_incidents || false,
            is_public: ticket.is_public || false,
            due_at: ticket.due_at || "",
            tags: ticket.tags ? ticket.tags.join(';') : "",
            custom_fields: ticket.custom_fields ? JSON.stringify(ticket.custom_fields) : "",
            satisfaction_rating_score: ticket.satisfaction_rating ? ticket.satisfaction_rating.score || "" : "",
            sharing_agreement_ids: ticket.sharing_agreement_ids ? ticket.sharing_agreement_ids.join(';') : "",
            custom_status_id: ticket.custom_status_id || "",
            fields: ticket.fields ? JSON.stringify(ticket.fields) : "",
            followup_ids: ticket.followup_ids ? ticket.followup_ids.join(';') : "",
            ticket_form_id: ticket.ticket_form_id || "",
            brand_id: ticket.brand_id || "",
            metric_set_url: ticket.metric_set ? ticket.metric_set.url || "" : "",
            metric_set_id: ticket.metric_set ? ticket.metric_set.id || "" : "",
            metric_set_ticket_id: ticket.metric_set ? ticket.metric_set.ticket_id || "" : "",
            metric_set_created_at: ticket.metric_set ? ticket.metric_set.created_at || "" : "",
            metric_set_updated_at: ticket.metric_set ? ticket.metric_set.updated_at || "" : "",
            metric_set_group_stations: ticket.metric_set ? ticket.metric_set.group_stations || "" : "",
            metric_set_assignee_stations: ticket.metric_set ? ticket.metric_set.assignee_stations || "" : "",
            metric_set_reopens: ticket.metric_set ? ticket.metric_set.reopens || "" : "",
            metric_set_replies: ticket.metric_set ? ticket.metric_set.replies || "" : "",
            metric_set_assignee_updated_at: ticket.metric_set ? ticket.metric_set.assignee_updated_at || "" : "",
            metric_set_requester_updated_at: ticket.metric_set ? ticket.metric_set.requester_updated_at || "" : "",
            metric_set_status_updated_at: ticket.metric_set ? ticket.metric_set.status_updated_at || "" : "",
            metric_set_initially_assigned_at: ticket.metric_set ? ticket.metric_set.initially_assigned_at || "" : "",
            metric_set_assigned_at: ticket.metric_set ? ticket.metric_set.assigned_at || "" : "",
            metric_set_solved_at: ticket.metric_set ? ticket.metric_set.solved_at || "" : "",
            metric_set_latest_comment_added_at: ticket.metric_set ? ticket.metric_set.latest_comment_added_at || "" : "",
            metric_set_reply_time_in_minutes_calendar: ticket.metric_set && ticket.metric_set.reply_time_in_minutes ? ticket.metric_set.reply_time_in_minutes.calendar || "" : "",
            metric_set_reply_time_in_minutes_business: ticket.metric_set && ticket.metric_set.reply_time_in_minutes ? ticket.metric_set.reply_time_in_minutes.business || "" : "",
            metric_set_first_resolution_time_in_minutes_calendar: ticket.metric_set && ticket.metric_set.first_resolution_time_in_minutes ? ticket.metric_set.first_resolution_time_in_minutes.calendar || "" : "",
            metric_set_first_resolution_time_in_minutes_business: ticket.metric_set && ticket.metric_set.first_resolution_time_in_minutes ? ticket.metric_set.first_resolution_time_in_minutes.business || "" : "",
            metric_set_full_resolution_time_in_minutes_calendar: ticket.metric_set && ticket.metric_set.full_resolution_time_in_minutes ? ticket.metric_set.full_resolution_time_in_minutes.calendar || "" : "",
            metric_set_full_resolution_time_in_minutes_business: ticket.metric_set && ticket.metric_set.full_resolution_time_in_minutes ? ticket.metric_set.full_resolution_time_in_minutes.business || "" : "",
            metric_set_agent_wait_time_in_minutes_calendar: ticket.metric_set && ticket.metric_set.agent_wait_time_in_minutes ? ticket.metric_set.agent_wait_time_in_minutes.calendar || "" : "",
            metric_set_agent_wait_time_in_minutes_business: ticket.metric_set && ticket.metric_set.agent_wait_time_in_minutes ? ticket.metric_set.agent_wait_time_in_minutes.business || "" : "",
            metric_set_requester_wait_time_in_minutes_calendar: ticket.metric_set && ticket.metric_set.requester_wait_time_in_minutes ? ticket.metric_set.requester_wait_time_in_minutes.calendar || "" : "",
            metric_set_requester_wait_time_in_minutes_business: ticket.metric_set && ticket.metric_set.requester_wait_time_in_minutes ? ticket.metric_set.requester_wait_time_in_minutes.business || "" : "",
            metric_set_on_hold_time_in_minutes_calendar: ticket.metric_set && ticket.metric_set.on_hold_time_in_minutes ? ticket.metric_set.on_hold_time_in_minutes.calendar || "" : "",
            metric_set_on_hold_time_in_minutes_business: ticket.metric_set && ticket.metric_set.on_hold_time_in_minutes ? ticket.metric_set.on_hold_time_in_minutes.business || "" : "",
            metric_set_reply_time_in_seconds_calendar: ticket.metric_set && ticket.metric_set.reply_time_in_seconds ? ticket.metric_set.reply_time_in_seconds.calendar || "" : "",
            metric_set_custom_status_updated_at: ticket.metric_set ? ticket.metric_set.custom_status_updated_at || "" : "",
            allow_channelback: ticket.allow_channelback || false,
            allow_attachments: ticket.allow_attachments || false,
            from_messaging_channel: ticket.from_messaging_channel || false,
            result_type: ticket.result_type || ""
        }));

        console.log("Transformed tickets data:", JSON.stringify(transformedData, null, 2));

        const fields = [
            'row_count', 'url', 'id', 'external_id', 'via_channel', 'via_source_from', 'via_source_to', 'via_source_rel', 'created_at',
            'updated_at', 'generated_timestamp', 'type', 'subject', 'raw_subject', 'description', 'priority', 'status',
            'recipient', 'requester_id', 'submitter_id', 'assignee_id', 'organization_id', 'group_id', 'collaborator_ids',
            'follower_ids', 'email_cc_ids', 'forum_topic_id', 'problem_id', 'has_incidents', 'is_public', 'due_at', 'tags',
            'custom_fields', 'satisfaction_rating_score', 'sharing_agreement_ids', 'custom_status_id', 'fields', 'followup_ids',
            'ticket_form_id', 'brand_id', 'metric_set_url', 'metric_set_id', 'metric_set_ticket_id', 'metric_set_created_at',
            'metric_set_updated_at', 'metric_set_group_stations', 'metric_set_assignee_stations', 'metric_set_reopens', 'metric_set_replies',
            'metric_set_assignee_updated_at', 'metric_set_requester_updated_at', 'metric_set_status_updated_at', 'metric_set_initially_assigned_at',
            'metric_set_assigned_at', 'metric_set_solved_at', 'metric_set_latest_comment_added_at', 'metric_set_reply_time_in_minutes_calendar',
            'metric_set_reply_time_in_minutes_business', 'metric_set_first_resolution_time_in_minutes_calendar', 'metric_set_first_resolution_time_in_minutes_business',
            'metric_set_full_resolution_time_in_minutes_calendar', 'metric_set_full_resolution_time_in_minutes_business', 'metric_set_agent_wait_time_in_minutes_calendar',
            'metric_set_agent_wait_time_in_minutes_business', 'metric_set_requester_wait_time_in_minutes_calendar', 'metric_set_requester_wait_time_in_minutes_business',
            'metric_set_on_hold_time_in_minutes_calendar', 'metric_set_on_hold_time_in_minutes_business', 'metric_set_reply_time_in_seconds_calendar',
            'metric_set_custom_status_updated_at', 'allow_channelback', 'allow_attachments', 'from_messaging_channel', 'result_type'
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(transformedData);

        // Save CSV to file in the current working directory
        const filePath = 'tickets.csv';
        fs.writeFileSync(filePath, csv);
        console.log("CSV file created successfully!");

    } catch (error) {
        if (error.response) {
            const errorStatus = error.response.status;
            const retryAfter = error.response.headers['retry-after'];
            console.error("Error encountered: " + errorStatus);

            if (errorStatus === 429) {
                const secondsToWait = Number(retryAfter);
                console.info('Too Many Requests (429) encountered. Pausing for ' + secondsToWait * 1000 + ' seconds before retrying.');
                await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000));

                return true;
            }
        } else {
            console.error("Unexpected error: ", error);
        }
    }
}

//Bulk Delete Tickets
exports.bulkDeleteTickets = async () => {
    while (true) {
        try {
            let exportSearchTicketsResult = await ticket.exportSearchTickets();
            let exportSearchTicketResultStatus = exportSearchTicketsResult.status;

            if (exportSearchTicketResultStatus >= 200 && exportSearchTicketResultStatus <= 300) {
                let exportSearchTicketsResponse = exportSearchTicketsResult.data.results;
                let toDeleteTicketIdsArray = exportSearchTicketsResponse.map(ticket => ticket.id);
                let toDeleteTicketIdsString = toDeleteTicketIdsArray.join(',');

                if (toDeleteTicketIdsArray.length > 0) {
                    try {
                        await ticket.bulkDeleteTickets(toDeleteTicketIdsString);
                    }
                    catch (error) {
                        let errorStatus = error.response.status;

                        if (errorStatus === 429) {
                            if (await handle429Error()) {
                                continue;
                            }
                        }
                        throw error;
                    }
                }
            }

            //Get all deleted tickets and permanently delete them
            let listDeletedTicketsResult = await ticket.listDeletedTickets();
            let listDeletedTicketsResultStatus = listDeletedTicketsResult.status;
            let listDeletedTicketsResultCount;

            if (listDeletedTicketsResultStatus >= 200 && listDeletedTicketsResultStatus <= 300) {
                let listDeletedTicketsResponse = listDeletedTicketsResult.data.deleted_tickets;
                listDeletedTicketsResultCount = listDeletedTicketsResult.data.count;
                console.info('Tickets to be permanently deleted count: ' + listDeletedTicketsResultCount);

                if (listDeletedTicketsResultCount > 0) {
                    let toPermanentDeleteTicketIdsArray = listDeletedTicketsResponse.map(ticket => ticket.id);
                    let toPermanentDeleteTicketIdsString = toPermanentDeleteTicketIdsArray.join(',');

                    await ticket.deleteMultipleTicketsPermanent(toPermanentDeleteTicketIdsString);
                }
            }

            let showJobStatusResult = await job.listJobStatuses();
            let showJobStatusResultStatus = showJobStatusResult.status;

            if (showJobStatusResultStatus >= 200 && showJobStatusResultStatus <= 300) {
                let showJobStatusResultResponse = showJobStatusResult.data.job_statuses;
                jobCount = showJobStatusResultResponse.filter(status => status.status === 'queued' || status.status === 'working').length;
                console.info('Current Active Job: ' + jobCount);

                if (jobCount > 30) {
                    await pause();
                }
            }

            if (listSearchTicketsResultsCount === 0 && listDeletedTicketsResultCount === 0) {
                console.info('Tickets has been completed deleted');
                break;
            }
        } catch (error) {
            let errorStatus = error.response.status;
            let retryAfter = error.response.headers['retry-after']
            console.error("Error encountered: " + errorStatus);

            if (errorStatus === 429) {
                if (await handle429Error(retryAfter)) {
                    continue;
                }
            }
            else {
                if (await handle40XError(errorStatus)) {
                    continue;
                }
            }
        }
    }
}

//Suspended Tickets
exports.RecoverOrDeleteSuspendedTicket = async (req, res) => {
    let ticketsToRecover = [];
    let ticketsToDelete = [];
    let nextUrl = "";
    const chunkSize = 100;

    try {
        do {
            const listSuspendedTicketsResult = await ticket.listSuspendedTickets(nextUrl);
            const listSuspendedTicketsStatus = listSuspendedTicketsResult.status;

            if (listSuspendedTicketsStatus >= 200 && listSuspendedTicketsStatus < 300) {
                const listSuspendedTicketsData = listSuspendedTicketsResult.data.suspended_tickets;
                const has_more = listSuspendedTicketsResult.data.meta.has_more;
                nextUrl = has_more ? listSuspendedTicketsResult.data.links.next : null;

                console.log("Has more results: " + has_more);

                for (let suspendedTicket of listSuspendedTicketsData) {
                    let ticket_id = suspendedTicket.id;
                    let cause = suspendedTicket.cause;

                    switch (cause) {
                        case "Detected as spam":
                            ticketsToDelete.push(ticket_id);
                            break;
                        default:
                            ticketsToRecover.push(ticket_id);
                            break;
                    }
                }
            } else {
                console.error(`Error fetching suspended tickets: ${listSuspendedTicketsStatus}`);
                nextUrl = null;
            }
        } while (nextUrl);

        console.log("Tickets to delete:", ticketsToDelete);
        console.log("Tickets to recover:", ticketsToRecover);

        console.log("Running Delete Multiple Suspended Tickets");
        for (let i = 0; i < ticketsToDelete.length; i += chunkSize) {
            let chunk = ticketsToDelete.slice(i, i + chunkSize);
            const commaSeparatedChunk = chunk.join(',');
            console.log("Suspended tickets to delete: " + commaSeparatedChunk);

            await ticket.deleteMultipleSuspendedTickets(commaSeparatedChunk);
        }

        console.log("Running Recover Multiple Suspended Tickets");
        for (let i = 0; i < ticketsToRecover.length; i += chunkSize) {
            let chunk = ticketsToRecover.slice(i, i + chunkSize);
            const commaSeparatedChunk = chunk.join(',');
            console.log("Suspended tickets to recover: " + commaSeparatedChunk);

            await ticket.recoverMultipleSuspendedTickets(commaSeparatedChunk);
        }

    } catch (error) {
        let errorStatus = error.response.status;
        let retryAfter = error.response.headers['retry-after'];
        console.error("Error encountered: " + errorStatus);

        if (errorStatus === 429) {
            const secondsToWait = Number(retryAfter);
            console.info('Too Many Requests (429) encountered. Pausing for ' + secondsToWait * 1000 + ' seconds before retrying.');
            await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000));

            return true;
        }
    }
};

//Export Suspended Ticket Export
exports.ExportSuspendedTicket = async (req, res) => {
    let ticketsToExport = [];
    let nextUrl = "";

    try {
        do {
            const listSuspendedTicketsResult = await ticket.listSuspendedTickets(nextUrl);
            const listSuspendedTicketsStatus = listSuspendedTicketsResult.status;

            if (listSuspendedTicketsStatus >= 200 && listSuspendedTicketsStatus < 300) {
                const currentDateTime = new Date().toISOString();
                const has_more = listSuspendedTicketsResult.data.meta.has_more;
                nextUrl = has_more ? listSuspendedTicketsResult.data.links.next : null;

                console.log(`[${currentDateTime}] Has more results: ` + has_more);

                ticketsToExport = ticketsToExport.concat(listSuspendedTicketsResult.data.suspended_tickets);

            } else {
                console.error(`Error fetching suspended tickets: ${listSuspendedTicketsStatus}`);
                nextUrl = null;
            }
        } while (nextUrl);

        // Transform the data: Log the initial data to verify its structure
        console.log("Initial tickets data:", JSON.stringify(ticketsToExport, null, 2));

        const transformedData = ticketsToExport.map(ticket => ({
            url: ticket.url || "",
            id: ticket.id || "",
            author_name: ticket.author ? (ticket.author.name || "") : "",
            subject: ticket.subject || "",
            content: ticket.content || "",
            cause: ticket.cause || "",
            cause_id: ticket.cause_id || "",
            error_messages: ticket.error_messages ? ticket.error_messages.join(';') : "",
            message_id: ticket.message_id || "",
            ticket_id: ticket.ticket_id || "",
            created_at: ticket.created_at || "",
            updated_at: ticket.updated_at || "",
            via_channel: ticket.via ? (ticket.via.channel || "") : "",
            attachments: ticket.attachments ? ticket.attachments.map(a => a.file_name).join(';') : "",
            recipient: ticket.recipient || "",
            brand_id: ticket.brand_id || ""
        }));

        // Log the transformed data to ensure correctness
        console.log("Transformed tickets data:", JSON.stringify(transformedData, null, 2));

        // Convert JSON to CSV
        const fields = [
            'url', 'id', 'author_name', 'subject', 'content', 'cause', 'cause_id', 'error_messages',
            'message_id', 'ticket_id', 'created_at', 'updated_at', 'via_channel', 'attachments', 'recipient', 'brand_id'
        ];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(transformedData);

        // Save CSV to file in the current working directory
        const filePath = 'suspended_tickets.csv';
        fs.writeFileSync(filePath, csv);
        console.log("CSV file created successfully!");

    } catch (error) {
        if (error.response) {
            const errorStatus = error.response.status;
            const retryAfter = error.response.headers['retry-after'];
            console.error("Error encountered: " + errorStatus);

            if (errorStatus === 429) {
                const secondsToWait = Number(retryAfter);
                console.info('Too Many Requests (429) encountered. Pausing for ' + secondsToWait * 1000 + ' seconds before retrying.');
                await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000));

                return true;
            }
        } else {
            console.error("Unexpected error: ", error);
        }
    }
};

//Import Suspended Tickets
exports.ImportSuspendedTicket = async (req, res) => {
    // Multer will store the uploaded file in req.file
    console.log('File received:', req.file);
    const filePath = req.file.path;

    try {
        // Read and convert CSV to JSON
        const jsonArray = await csv().fromFile(filePath);

        // Log the converted JSON data to ensure correctness
        console.log("Converted JSON data:", JSON.stringify(jsonArray, null, 2));

        // Return the JSON data as a response or handle it as needed
        res.status(200).json({
            success: true,
            data: jsonArray
        });

    } catch (error) {
        console.error("Error reading CSV file: ", error);
        res.status(500).json({
            success: false,
            message: "Error processing CSV file."
        });
    } finally {
        // Optionally delete the file after processing to save space
        fs.unlinkSync(filePath);
    }
};

//List Tickets with Comments and Attachments
exports.listTicketsWithCommentsAndAttachments = async (req, res) => {
    const ticketDatas = [];
    let listTicketNextUrl = "";

    try {
        do {
            const listTicketsResult = await ticket.exportSearchTickets(listTicketNextUrl);
            const listTicketsResultStatus = listTicketsResult.status;

            if (listTicketsResultStatus >= 200 && listTicketsResultStatus < 300) {
                const listTicketsHasMore = listTicketsResult.data.meta.has_more;
                listTicketNextUrl = listTicketsHasMore ? listTicketsResult.data.links.next : null;
                console.log(`[${new Date().toISOString()}] Ticket has more results: ${listTicketsHasMore}`);

                const ticketResults = listTicketsResult.data.results;

                console.log(`[${new Date().toISOString()}] Looping the ticket results to retrieve the comments`);

                for (const ticketResult of ticketResults) {
                    let ticketComments = [];
                    let listTicketCommentsNextUrl = null;
                    const ticketId = ticketResult.id;

                    console.log(`[${new Date().toISOString()}] Retrieving ticket comments for Ticket ID: ` + ticketId);

                    do {
                        const listCommentsResult = await ticket.listComments(ticketId, listTicketCommentsNextUrl);
                        const listCommentsResultStatus = listCommentsResult.status;

                        if (listCommentsResultStatus >= 200 && listCommentsResultStatus < 300) {
                            ticketComments.push(...listCommentsResult.data.comments);
                            const listTicketCommentsHasMore = listCommentsResult.data.meta.has_more;
                            listTicketCommentsNextUrl = listTicketCommentsHasMore ? listCommentsResult.data.links.next : null;

                            console.log(`[${new Date().toISOString()}] Ticket Comments has more results: ${listTicketCommentsHasMore}`);
                        } else {
                            break;
                        }
                    } while (listTicketCommentsNextUrl);

                    ticketResult.comments = ticketComments;
                    ticketDatas.push(ticketResult);
                }
            } else {
                break;
            }
        } while (listTicketNextUrl);

        res.status(200).json({
            data: ticketDatas,
            count: ticketDatas.length
        });
    } catch (error) {
        const errorStatus = error?.response?.status || '';
        const retryAfter = error?.response?.headers?.['retry-after'] || '';
        console.error("Error encountered: ", error);

        res.status(500).json({
            message: "An error occurred while processing your request.",
            errorStatus,
            retryAfter
        });
    }
};