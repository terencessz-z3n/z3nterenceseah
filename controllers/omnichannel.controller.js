//Define defaults
const omnichannel = require('../services/omnichannel.services');

//Agent Availability
exports.agentAvailability = async (req, res) => {
    try {
        let response = {};
        const getAgentAvailabilityResult = await omnichannel.agentAvailability();
        const getAgentAvailabilityResultStatus = getAgentAvailabilityResult.status;

        if (getAgentAvailabilityResultStatus >= 200 && getAgentAvailabilityResultStatus <= 300) {
            const getAgentAvailabilityResponse = getAgentAvailabilityResult.data;
            const onlineAgentCount = getAgentAvailabilityResponse.data.length;

            if (onlineAgentCount > 0) {
                response.hasAgentsOnline = true;
            } else {
                response.hasAgentsOnline = false;
            }

            return res.status(getAgentAvailabilityResultStatus).send(response);
        }
    }
    catch (error) {
        return res.send(error);
    }
}