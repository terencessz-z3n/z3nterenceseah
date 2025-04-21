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
        const email = req.body.email;
        const password = req.body.password;
        const verifyUserResult = await User.verifyUser(email, password);

        if (!verifyUserResult.success) {
            return res.status(403).send("Invalid Login Credentials");
        }

        const userData = verifyUserResult.data;

        let messagePayload = {};

        if (userData.email === "admin@email.com") {
            messagePayload = {
                external_id: "019656a5-dda4-7eda-8b01-424e73079376",
                email: "zdu1@email.com",
                email_verified: true,
                //exp: Math.floor(Date.now() / 1000) + 60,
                name: "Zendesk User 1",
                scope: "user"
            }
        } else {
            messagePayload = {
                external_id: userData.id,
                email: userData.email,
                email_verified: true,
                //exp: Math.floor(Date.now() / 1000) + 3600,
                name: userData.name,
                scope: "user"
            }
        }

        const suncoPayload = {
            scope: 'user',
            external_id: userData.email
        }

        const messageToken = await jwt.generateToken("message", messagePayload);
        const suncoToken = await jwt.generateToken("sunco", suncoPayload);

        let tokenResponse = {};
        tokenResponse.messageToken = messageToken;
        tokenResponse.suncoToken = suncoToken;

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