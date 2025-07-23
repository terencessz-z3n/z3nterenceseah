//Define defaults
const db = require('../models');
const User = db.User;
const jwt = require('../services/jwt.services');
const jwtService = require('jsonwebtoken');
const uuid = require('uuid');
const jwtSharedKey = process.env.JWTSHAREDKEY;
const zendeskURL = process.env.ZENDESKURL;

//Authenticate User
exports.authenticate = async (req, res) => {
    try {
        let messagePayload = {};
        const userType = req.body.userType;

        if(userType === "admin") {
            messagePayload = {
                external_id: "admin-01976f0f-1ab5-7d63-b123-8e84e9637b5f",
                email: "admin@email.com",
                email_verified: true,
                name: "Administrator",
                scope: "user",
            }

            const adminJwtExpiryMinutes = req.body.adminJwtExpiryMinutes;

            if (typeof adminJwtExpiryMinutes === 'number' && adminJwtExpiryMinutes > 0) {
                messagePayload.exp = Math.floor(Date.now() / 1000) + adminJwtExpiryMinutes * 60;
            }
        } else if(userType === "newUser") {
            const prefix = req.body.newUserExternalIdPrefix;
            const uniqueId = uuid.v4();

            messagePayload = {
                external_id: `${prefix}-${uniqueId}`,
                email: req.body.newUserEmail,
                email_verified: req.body.newUserEmailVerified,
                name: req.body.newUserName,
                scope: "user",
            }

            const jwtExpiryMinutes = req.body.jwtExpiryMinutes;

            if (typeof jwtExpiryMinutes === 'number' && jwtExpiryMinutes > 0) {
                messagePayload.exp = Math.floor(Date.now() / 1000) + jwtExpiryMinutes * 60;
            }
        } else if (userType === "existingUser") {
            const prefix = req.body.existingUserExternalIdPrefix;
            const uniqueId = uuid.v4();

            messagePayload = {
                external_id: `${prefix}-${uniqueId}`,
                email: req.body.existingUserEmail,
                email_verified: req.body.existingUserEmailVerified,
                name: req.body.existingUserName,
                scope: "user",
            }

            const jwtExpiryMinutes = req.body.jwtExpiryMinutes;

            if (typeof jwtExpiryMinutes === 'number' && jwtExpiryMinutes > 0) {
                messagePayload.exp = Math.floor(Date.now() / 1000) + jwtExpiryMinutes * 60;
            }
        }

        const messageToken = await jwt.generateToken("message", messagePayload);

        let tokenResponse = {};
        tokenResponse.messageToken = messageToken;

        return res.status(201).send(tokenResponse);
    }
    catch (error) {
        return res.send(error);
    }
}

//Multi-Brand Authenticate User
exports.multiBrandAuthenticate = async (req, res) => {
    /*const email = req.body.email;
    const password = req.body.password;
    const returnTo = req.body.return_to;

    const verifyUserResult = await User.verifyUser(email, password);

    if (verifyUserResult.success) {
        const payload = {
            iat: Math.floor(new Date().getTime() / 1000),
            jti: uuid.v4(),
            external_id: verifyUserResult.data.id,
            name: verifyUserResult.data.name,
            email: verifyUserResult.data.email,
            tags: ["multibrand"]
        }

        const token = jwtService.sign(payload, jwtSharedKey, {
            algorithm: 'HS256'
        });

        let redirectURL = `https://z3ntscap.zendesk.com/access/jwt?jwt=${token}&return_to=${encodeURIComponent(returnTo)}`;

        return res.status(201).send(redirectURL);
    } else {
        return res.status(403).send("Invalid Login Credentials");
    }*/
}

//JWT SSO Authenticate User
exports.jwtsso = async (req, res) => {
    const decodedToken = jwtService.decode(req.body.messageToken);
    const brandId = req.body.brand_id;
    const returnTo = req.query.return_to;

    const payload = {
        iat: Math.floor(new Date().getTime() / 1000),
        jti: uuid.v4(),
        external_id: decodedToken.external_id,
        name: decodedToken.name,
        email: decodedToken.email,
        tags: ["ssotest"]
    };

    const token = jwtService.sign(payload, jwtSharedKey, {
        algorithm: 'HS256'
    });

    let redirectURL = `${zendeskURL}/access/jwt?jwt=${token}`;

    if (returnTo) {
        redirectURL += `&return_to=${encodeURIComponent(returnTo)}`;
    }

    console.log('Redirecting to: ' + redirectURL);

    //res.redirect({ redirectURL });
    return res.status(201).send({ redirectURL });
}

//Help Center Authenticate User for Messaging Web Widget
exports.helpCenterMessagingAuth = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = await jwt.verifyHCToken(token);
        let userIdToUse;

        if (!verifiedToken.externalId) {
            console.log("No ExternalId, using email: ", verifiedToken.email);
            userIdToUse = verifiedToken.email;
        } else {
            userIdToUse = verifiedToken.externalId;
        }

        const payload = {
            external_id: userIdToUse,
            email: verifiedToken.email,
            email_verified: true,
            exp: Math.floor(Date.now() / 1000) + 60,
            scope: "user"
        }

        const messageToken = await jwt.generateToken("message", payload);

        let tokenResponse = {};
        tokenResponse.messageToken = messageToken;

        return res.status(201).send(tokenResponse);
    }
    catch (error) {
        return res.send(error);
    }
}