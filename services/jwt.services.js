//Define defaults
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const messageSecret = process.env.MESSAGESECRET;
const messageKeyId = process.env.MESSAGEKEYID;
const suncoSecret = process.env.SUNCOSECRET;
const suncoKeyId = process.env.SUNCOKEYID;

//erulearning
//const messageSecret = "0Ls389J10U92ePMuTTTejVhIX-5wJyfGvndVX87lCMnWUKEe17R5bVqEf7O_8w559oKcC9jtCtpZdTB5yS4X9g";
//const messageKeyId = "app_6809dc2190b09087ef024d93"

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
    });

    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;
    const signingKey = await jwksClientInstance.getSigningKey(kid);
    const publicKey = signingKey.rsaPublicKey;

    return jwt.verify(token, publicKey);
}

module.exports = { generateToken, verifyHCToken }