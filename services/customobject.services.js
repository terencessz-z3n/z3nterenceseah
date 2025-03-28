//Define defaults
const axios = require('axios');
const accessToken = process.env.ACCESSTOKEN;
const zendeskapiurl = process.env.ZENDESKAPIURL;

//Define the axios config
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};

//List Job Statuses
const listCustomObjects = async () => {
    const listCustomObjectsApi = `${zendeskapiurl}/custom_objects/country_notice/records`;

    return await axios.get(listCustomObjectsApi, axiosConfig);
}

module.exports = { listCustomObjects }