//Define defaults
const omnichannel = require('../services/omnichannel.services');
const SunshineConversationsClient = require('sunshine-conversations-client');
const defaultClient = SunshineConversationsClient.ApiClient.instance;
const suncoSecret = process.env.SUNCOSECRET;
const suncoKeyId = process.env.SUNCOKEYID;
let basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = suncoKeyId;
basicAuth.password = suncoSecret;

//Post Message
const postMessage = async (payload) => {
    const appId = payload.app.id;
    const trigger = payload.type || payload.events[0].type;

    if (trigger === 'conversation:message') {
        const authorType = payload.events[0].payload.message.author.type;
        const currentActiveIntegration = payload.events[0].payload.conversation.activeSwitchboardIntegration.id;

        if (authorType === 'user' && currentActiveIntegration === "6687a1396e591e7a992762e7") {
            const apiInstance = new SunshineConversationsClient.MessagesApi();
            const messagePost = new SunshineConversationsClient.MessagePost();
            const conversationId = payload.events[0].payload.conversation.id;
            const content = payload.content || payload.events[0].payload.message.content.text.toLowerCase();
            messagePost.setAuthor({ type: 'business' });

            switch (content) {
                case 'botgreeting':
                    messagePost.setContent({
                        type: 'text',
                        text: 'I am the Cap Sunco Bot! You can either start by connecting to an agent by click on the Talk to Agent button below or ask me some questions and I will do my best to answer you!'
                    });

                    break;
                case 'text':
                    messagePost.setContent({
                        type: 'text',
                        text: 'Live long and prosper'
                    });

                    break;
                case 'image':
                    messagePost.setContent({
                        type: 'image',
                        mediaUrl: 'https://z3nterenceseahacme.zendesk.com/hc/theming_assets/01J25TG6KD122EG45XSBEE55P7',
                    });

                    break;
                case 'image with text':
                    messagePost.setContent({
                        type: 'image',
                        mediaUrl: 'https://z3nterenceseahacme.zendesk.com/hc/theming_assets/01J25TG6KD122EG45XSBEE55P7',
                        text: 'Mjonir'
                    });

                    break;
                case 'compound':
                    messagePost.setContent({
                        type: 'image',
                        mediaUrl: 'https://z3nterenceseahacme.zendesk.com/hc/theming_assets/01J25TG6KD122EG45XSBEE55P7',
                        text: 'Mjonir',
                        actions: [
                            {
                                type: 'postback',
                                text: 'Add to Cart',
                                payload: 'NOOP'
                            }
                        ]
                    });

                    break;
                case 'link button':
                    messagePost.setContent({
                        type: 'text',
                        text: 'Mjonir',
                        actions: [
                            {
                                type: 'link',
                                text: 'Learn More',
                                uri: 'https://marvel.fandom.com/wiki/Mjolnir'
                            }
                        ]
                    });

                    break;
                case 'webview':
                    messagePost.setContent({
                        type: 'text',
                        text: 'Mjonir',
                        actions: [
                            {
                                type: 'webview',
                                text: 'All about Mjonir',
                                uri: 'https://en.wikipedia.org/wiki/Mj%C3%B6lnir',
                                fallback: 'https://en.wikipedia.org/wiki/Mj%C3%B6lnir'
                            }
                        ]
                    });

                    break;
                case 'surveyquickreply':
                    messagePost.setContent({
                        type: 'text',
                        text: 'How would you rate our interaction?',
                        actions: [
                            {
                                type: 'reply',
                                text: '😍',
                                payload: 'Very Satisfied',
                                metadata: {
                                    userResponseValue: '5',
                                    agentNumber: '239',
                                    otherSalientInfo: 'Taco'
                                }
                            },
                            {
                                type: 'reply',
                                text: '🙂',
                                payload: 'Satisfied',
                                metadata: {
                                    userResponseValue: '4',
                                    agentNumber: '239',
                                    otherSalientInfo: 'burrito'
                                }
                            },
                            {
                                type: 'reply',
                                text: '😐',
                                payload: 'Neutral',
                                metadata: {
                                    userResponseValue: '3',
                                    agentNumber: '239',
                                    otherSalientInfo: 'pizza'
                                }
                            },
                            {
                                type: 'reply',
                                text: '🙁',
                                payload: 'Dissatisfied',
                                metadata: {
                                    userResponseValue: '2',
                                    agentNumber: '239',
                                    otherSalientInfo: 'pizza'
                                }
                            },
                            {
                                type: 'reply',
                                text: '😠',
                                payload: 'Very Dissatisfied',
                                metadata: {
                                    userResponseValue: '1',
                                    agentNumber: '239',
                                    otherSalientInfo: 'hamburger'
                                }
                            }
                        ]
                    });

                    break;
                case 'surveymonkey':
                    messagePost.setContent({
                        type: 'text',
                        text: 'Survey',
                        actions: [
                            {
                                type: 'webview',
                                size: 'full',
                                text: 'Survey Monkey',
                                uri: 'https://www.surveymonkey.com/r/PM89MSB',
                                fallback: 'https://www.surveymonkey.com/r/PM89MSB'
                            }
                        ]
                    });

                    break;
                case 'reply button':
                    messagePost.setContent({
                        type: 'text',
                        text: 'Would you like to have a Mjonir',
                        actions: [
                            {
                                type: 'reply',
                                text: 'Yes',
                                uri: 'https://shorturl.at/ck7pK',
                                payload: 'NOOP'
                            },
                            {
                                type: 'reply',
                                text: 'No',
                                uri: 'https://shorturl.at/ck7pK',
                                payload: 'NOOP'
                            }
                        ]
                    });

                    break;
                case 'carousel':
                    messagePost.setContent({
                        type: 'carousel',
                        items: [
                            {
                                title: 'Mjonir Part One',
                                description: 'The birth of Mjonir',
                                mediaUrl: 'https://z3nterenceseahacme.zendesk.com/hc/theming_assets/01J25TG6KD122EG45XSBEE55P7',
                                actions: [
                                    {
                                        text: 'View in Webview',
                                        type: 'webview',
                                        uri: 'https://shorturl.at/ck7pK',
                                        fallback: 'https://shorturl.at/ck7pK'
                                    },
                                    {
                                        text: 'View in another page',
                                        type: 'link',
                                        uri: 'https://marvel.fandom.com/wiki/Mjolnir'
                                    }
                                ]
                            },
                            {
                                title: 'Mjonir Part Two',
                                description: 'The First wielder of Mjonir',
                                mediaUrl: 'https://z3nterenceseahacme.zendesk.com/hc/theming_assets/01J25TG6KD122EG45XSBEE55P7',
                                actions: [
                                    {
                                        text: 'View in Webview',
                                        type: 'webview',
                                        uri: 'https://shorturl.at/ck7pK',
                                        fallback: 'https://shorturl.at/ck7pK'
                                    },
                                    {
                                        text: 'View in another page',
                                        type: 'link',
                                        uri: 'https://marvel.fandom.com/wiki/Mjolnir'
                                    }
                                ]
                            }
                        ]
                    });

                    break;
                case 'form':
                    messagePost.setContent({
                        type: 'form',
                        fields: [
                            {
                                type: 'text',
                                name: 'name',
                                label: 'Name',
                                placeholder: 'Enter your name...'
                            },
                            {
                                type: 'email',
                                name: 'email',
                                label: 'Email',
                                placeholder: 'Enter your email...'
                            }
                        ]
                    });

                    break;
                default:
                    messagePost.setContent({
                        type: 'text',
                        text: 'Sorry, I do not understand your question. Can I connect you to an agent?',
                        actions: [
                            {
                                text: 'Talk to an agent',
                                payload: '',
                                type: 'reply'
                            }
                        ]
                    });
            }

            return await apiInstance.postMessage(appId, conversationId, messagePost);
        }
    }
}

//Pass Control
const passControl = async (payload) => {
    const appId = payload.app.id;
    const conversationId = payload.events[0].payload.conversation.id;
    const user = payload.events[0].payload.message.author.user;

    /*let omniAgentAvailabilityMsg;
    const getAgentAvailabilityResult = await omnichannel.agentAvailability();
    const getAgentAvailabilityResultStatus = getAgentAvailabilityResult.status;

    if (getAgentAvailabilityResultStatus >= 200 && getAgentAvailabilityResultStatus <= 300) {
        const getAgentAvailabilityResponse = getAgentAvailabilityResult.data;
        const onlineAgentCount = getAgentAvailabilityResponse.data.length;

        if (onlineAgentCount === 0) {
            omniAgentAvailabilityMsg = "All our agents are busy at the moment. Please allow us some time to respond to you.";
        }
    }

    if (!omniAgentAvailabilityMsg) {
        omniAgentAvailabilityMsg = "Thank you for your patience. An agent will be with you shortly.";
    }*/

    const switchhboardActionApi = new SunshineConversationsClient.SwitchboardActionsApi();
    //const postMessageApi = new SunshineConversationsClient.MessagesApi();
    //const messagePost = new SunshineConversationsClient.MessagePost();
    //messagePost.setAuthor({ type: 'business' });
    //messagePost.setContent({ type: 'text', text: omniAgentAvailabilityMsg });

    //try {
    //    await postMessageApi.postMessage(appId, conversationId, messagePost);
    //} catch (error) {
    //    console.error("Error posting message:", error);
    //}

    const passControlBody = new SunshineConversationsClient.PassControlBody();
    const conversationMessages = new SunshineConversationsClient.MessagesApi();

    const messages = await conversationMessages.listMessages(appId, conversationId);
    const firstMessage = messages.messages[0].id;

    passControlBody.switchboardIntegration = '65f8e890a7d711127f1da087';
    passControlBody.metadata = {
        "origin_source_type": "web",
        'dataCapture.ticketField.42376473519897': conversationId,
        "dataCapture.ticketField.44495051155225": user.profile.email,
        "dataCapture.ticketField.37809183235993": 'Your long story here...',
        //"dataCapture.systemField.requester.name": "suncouser2",
        //"dataCapture.systemField.requester.email": "suncouser2@email.com",
        "dataCapture.systemField.tags": "tag1,tag2,tag3",
        "first_message_id": firstMessage
    };

    return await switchhboardActionApi.passControl(appId, conversationId, passControlBody);
};

//Offer Control (Can't be used for AW. This is probably used when giving to another switchboard)
const offerControl = async (payload) => {
    const apiInstance = new SunshineConversationsClient.SwitchboardActionsApi();
    const offerControlBody = new SunshineConversationsClient.OfferControlBody();

    const appId = payload.app.id;
    const conversationId = payload.events[0].payload.conversation.id;

    offerControlBody.switchboardIntegration = '65f8e890a7d711127f1da087';
    offerControlBody.metadata = {
        'dataCapture.ticketField.37875000141465': 'Metadata from Sunco',
        'dataCapture.systemField.requester.name': "Terence Sunco"
    };

    return await apiInstance.offerControl(appId, conversationId, offerControlBody);
}

//Accept Control (Can't be used for AW. This is probably used when giving to another switchboard)
const acceptControl = async (payload) => {
    const apiInstance = new SunshineConversationsClient.SwitchboardActionsApi();
    const acceptControlBody = new SunshineConversationsClient.AcceptControlBody();

    const appId = payload.app.id;
    const conversationId = payload.events[0].payload.conversation.id;

    acceptControlBody.switchboardIntegration = '65f8e890a7d711127f1da087';
    acceptControlBody.metadata = {
        'dataCapture.ticketField.37875000141465': 'Metadata from Sunco',
        'dataCapture.systemField.requester.name': "Terence Sunco"
    };

    return await apiInstance.acceptControl(appId, conversationId, acceptControlBody);
}

//Create Conversation
const createConversation = async (payload) => {
    const apiInstance = new SunshineConversationsClient.ConversationsApi();
    const conversationCreateBody = new SunshineConversationsClient.ConversationCreateBody();
    conversationCreateBody.type = "personal";
    conversationCreateBody.displayName = "Conversation with " + payload.name;
    conversationCreateBody.participants = [
        {
            "userExternalId": payload.external_id
        }
    ];
    const appId = "65f8e88eee9018bd08d1c672";

    return await apiInstance.createConversation(appId, conversationCreateBody);
}
module.exports = { postMessage, passControl, offerControl, acceptControl, createConversation }