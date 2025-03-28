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

//Show Organization
const showOrganization = async (id) => {
    const getOrganizationApi = `${zendeskapiurl}/organizations/${id}`;

    return await axios.get(getOrganizationApi, axiosConfig);
}

module.exports = { showOrganization }