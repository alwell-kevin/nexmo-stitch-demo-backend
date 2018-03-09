var Nexmo = require('nexmo');
var Conversation = require('nexmo-conversation')

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID,
    privateKey: process.env.NEXMO_PRIVATE_KEY,
});

const getJwt = () => {
    var jwt = nexmo.generateJwt();

    return jwt
}

module.exports.getJwt = getJwt;