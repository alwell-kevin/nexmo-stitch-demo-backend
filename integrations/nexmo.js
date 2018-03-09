var Nexmo = require('nexmo');
var Conversation = require('nexmo-conversation')
var request = require('request');
var ConvClient = require('../node_modules/nexmo-conversation/dist/conversationClient.js')
var application;

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID,
    privateKey: process.env.NEXMO_PRIVATE_KEY,
});

const getJwt = () => {
    if (!jwt) {
        var jwt = nexmo.generateJwt();
    }

    return jwt
}

const createClientInstance = () => {
    var rtc = new ConvClient({
        debug: false
    });
    // var token = request login token as above, with sub=<username>
    rtc.login(getJwt()).then(
        function (app) {
            application = app;
            // use the application object to manage the conversations
            // access the available conversations
            console.log("APPLICATION CONVS: ", application.conversations);
        }
    );

}

const createConversation = () => {
    var conversationData = {
        display_name: 'Nexmo Conversation'
    };
    application.newConversation(conversationData).then(
        function (conversation) {
            // join the created conversation
            conversation.join().then(
                function (member) {
                    console.log("Joined as " + member.user.name);
                });
        }).catch(function (error) {
        console.log(error);
    });
}

const createUser = (userName) => {
    var options = {
        method: "POST",
        url: process.env.NEXMO_STITCH_BASE_URL + "/users",
        qs: {
            name: userName
        },
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getJwt()
        }
    };

    request(options, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });
}

module.exports.getJwt = getJwt;
module.exports.createClientInstance = createClientInstance;
module.exports.createConversation = createConversation;
module.exports.createUser = createUser;