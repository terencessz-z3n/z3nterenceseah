//Define defaults
const db = require('../models');
const User = db.User;
const user = require('../services/users.services');
const fs = require('fs');
const csv = require('csvtojson');

//Create User
exports.createUser = async (req, res) => {
    try {
        const userData = {
            "user": {
                "email": "test1@example.com",
                "name": "test1",
                "role": "agent"
            }
        }

        req.userData = userData;

        const createUserResult = await user.createUser(req);
        const createUserResultStatus = createUserResult.status;

        if (createUserResultStatus >= 200 && createUserResultStatus <= 300) {
            const createUserResponse = createUserResult.data.users;

            return res.status(createUserResultStatus).send(createUserResponse);
        }
    }
    catch (error) {
        return res.send(error);
    }
}

//List Users
exports.listUsers = async (req, res) => {
    try {
        const listUserResult = await user.listUsers(req);
        const listUserResultStatus = listUserResult.status;

        if (listUserResultStatus >= 200 && listUserResultStatus <= 300) {
            const listUserResponse = listUserResult.data.users;

            return res.status(listUserResultStatus).send(listUserResponse);
        }
    }
    catch (error) {
        return res.send(error);
    }
}

//Show User
exports.showUser = async (req, res) => {
    try {
        let id = "";

        if (req.params.id != undefined) {
            id = req.params.id;
        }
        else {
            id = req.body.id;
        }

        const showUserResult = await user.showUser(id);
        const showUserResultStatus = showUserResult.status;

        if (showUserResultStatus >= 200 && showUserResultStatus <= 300) {
            const showUserResponse = showUserResult.data.user;

            return res.status(showUserResultStatus).send(showUserResponse);
        }
    }
    catch (error) {
        return res.send(error);
    }
}

//Show User By Email
exports.showUserByEmail = async (req, res) => {
    try {

        const email = req.body.email;

        const showUserByEmailResult = await User.getbyEmail(email);
        const showUserByEmailStatus = showUserByEmailResult.success;

        if (showUserByEmailStatus) {
            const showUserByEmailResponse = showUserByEmailResult.data;

            return res.status(200).send(showUserByEmailResponse);
        }
    }
    catch (error) {
        return res.send(error);
    }
}

//Update User
exports.updateUser = async (req, res) => {
    try {
        const userData = {
            "user": {
                "email": "test1@example.com"
            }
        }

        req.userData = userData;

        const updateUserResult = await user.createUser(req);
        const updateUserResultStatus = updateUserResult.status;

        if (updateUserResultStatus >= 200 && updateUserResultStatus <= 300) {
            const updateUserResponse = updateUserResult.data.users;

            return res.status(updateUserResultStatus).send(updateUserResponse);
        }
    }
    catch (error) {
        return res.send(error);
    }
}

//Delete User
exports.deleteUser = async (req, res) => {
    try {
        const deleteUserResult = await user.showUser(req);
        const deleteUserResultStatus = deleteUserResult.status;

        if (deleteUserResultStatus >= 200 && deleteUserResultStatus <= 300) {
            const deleteUserResponse = deleteUserResult.data.user;

            return res.status(deleteUserResultStatus).send(deleteUserResponse);
        }
    }
    catch (error) {
        return res.send(error);
    }
}

exports.webhook = async (req, res) => {
    try {
        let id = req.body.id;
        let email = req.body.email;

        const getUserResult = await User.getbyfield("email", email);

        if (getUserResult.success) {
            let updateUserRequest = {}
            updateUserRequest.data = {
                "id": id,
                "user": {
                    "tags": getUserResult.data.membership
                }
            }

            await user.updateUser(updateUserRequest)
        }
    }
    catch (error) {
        return res.send(error)
    }
}

exports.bulkUpdateAgents = async (req, res) => {
    const filePath = req.file.path;

    try {
        const usersData = await csv().fromFile(filePath);

        const lowerCaseUsersData = usersData.map(user => {
            return Object.keys(user).reduce((acc, key) => {
                acc[key.toLowerCase()] = user[key];
                return acc;
            }, {});
        });

        let createorUpdateManyUsersData = {
            users: lowerCaseUsersData
        };

        await user.createorUpdateManyUsers(createorUpdateManyUsersData);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    } finally {
        fs.unlinkSync(filePath);
    }
}