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

//Create User
const createUser = async (req) => {
    const createUserApi = `${zendeskapiurl}/users`;
    const createUserData = req.userData;

    return await axios.post(createUserApi, createUserData, axiosConfig);
}

//List Users
const listUsers = async (req) => {
    const queryParams = Object.entries(req.query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const listUsersApi = `${zendeskapiurl}/users?${queryParams}`;

    return await axios.get(listUsersApi, axiosConfig);
}

//Show User
const showUser = async (id) => {
    const getUserApi = `${zendeskapiurl}/users/${id}`;

    return await axios.get(getUserApi, axiosConfig);
}

//Update User
const updateUser = async (req) => {
    const id = req.data.id;
    delete req.data.id;

    const updateUserApi = `${zendeskapiurl}/users/${id}`;
    const updateUserData = req.data;

    return await axios.put(updateUserApi, updateUserData, axiosConfig);
}

//Create or Update Many Users
const createorUpdateManyUsers = async (req) => {
    const createOrUpdateManyUsersApi = `${zendeskapiurl}/users/create_or_update_many`;
    const createOrUpdateManyUsersData = req;

    return await axios.post(createOrUpdateManyUsersApi, createOrUpdateManyUsersData, axiosConfig);
}

//Delete User
const deleteUser = async (req) => {
    const deleteUserApi = `${zendeskapiurl}/users/${req.params.id}`;

    return await axios.delete(deleteUserApi, axiosConfig);
}

module.exports = { createUser, listUsers, showUser, updateUser, createorUpdateManyUsers, deleteUser }
