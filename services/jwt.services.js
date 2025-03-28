//Define defaults
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const messageSecret = process.env.MESSAGESECRET;
const messageKeyId = process.env.MESSAGEKEYID;
const suncoSecret = process.env.SUNCOSECRET;
const suncoKeyId = process.env.SUNCOKEYID;

//Typeform
//Prod
//const messageSecret = "q_U2vQcY0xwU9bmLKpJQOoUW00x8RNYf2zUcl_MixWzgAh8eSkJYgqIHULPE1BKaot0CCwCvCCsKFgnk5wvBeA";
//const messageKeyId = "app_66f4b0215444c494d5e1cabb";
//Sandbox
//const messageSecret = "2aASvgv4UhVFqjsdRsNLGSEig-IcCUE4U4-VoM6VLYj5hSfCwQH6kPlb97Oz_qIiubOY1fhXiuxFyMgqD1QXfg";
//const messageKeyId = "app_66ceeb4ebaba0531e758ce27";

//SuperBet
//const messageSecret = "Gh3WLPFXCjPhsK0mazvwSMS3SwwNUSECmo9hBarMiyqvehkyxQfyAMaFmRu1eBE2mO399pMnxaLbHnt54meXPg";
//const messageKeyId = "app_6791ea8a5b52c03c2d1857b0";

//ADEO
//const messageSecret = "-k_RuoId9driqqJz2_XE49JEjMy-jQHKq9n7UaWWqd-Yqx--wiw_uWRvzFhO5ORHyOqCnjYVyKSj-dEOq1R3QQ"
//const messageKeyId = "app_67a95d55a30b40d2ae2949f5"

//Generate JWT Token
const generateToken = async (type, req) => {
    switch (type) {
        case 'message':
            return await jwt.sign(
                req,
                messageSecret,
                {
                    header:
                    {
                        alg: 'HS256',
                        typ: 'JWT',
                        kid: messageKeyId
                    }
                });
        case 'sunco':
            return await jwt.sign(
                req,
                suncoSecret,
                {
                    header:
                    {
                        alg: 'HS256',
                        typ: 'JWT',
                        kid: suncoKeyId
                    }
                });
        default:
            return null;
    }
}

// verify Help Center token
const verifyHCToken = async (token) => {
    const jwksClientInstance = jwksClient({
        jwksUri: 'https://z3ntscap.zendesk.com/api/v2/help_center/integration/keys.json'
        //jwksUri: 'https://adeomarketplace1706263233.zendesk.com/api/v2/help_center/integration/keys.json'
    });

    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;
    const signingKey = await jwksClientInstance.getSigningKey(kid);
    const publicKey = signingKey.rsaPublicKey;

    return jwt.verify(token, publicKey);
}

module.exports = { generateToken, verifyHCToken }