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
const listJobStatuses = async () => {
    const listJobStatusesApi = `${zendeskapiurl}/job_statuses`;

    return await axios.get(listJobStatusesApi, axiosConfig);
}

// Show Job Status
const showJobStatus = async (id) => {
    const showJobStatusApi = `${zendeskapiurl}/job_statuses/` + id;

    return await axios.get(showJobStatusApi, axiosConfig);
}

module.exports = { listJobStatuses, showJobStatus }