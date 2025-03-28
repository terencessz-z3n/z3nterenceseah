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

const agentAvailability = async () => {
    const agentAvailabilityApi = `${zendeskapiurl}/agent_availabilities?filter[channel_status]=messaging:online&filter[remaining_capacity]=messaging:1`;

    return await axios.get(agentAvailabilityApi, axiosConfig);
}

module.exports = { agentAvailability }