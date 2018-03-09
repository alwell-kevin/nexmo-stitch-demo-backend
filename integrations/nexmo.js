var Nexmo = require('nexmo');
var Conversation = require('nexmo-conversation')
var request = require('request');
var application;

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID,
    privateKey: process.env.NEXMO_PRIVATE_KEY,
});

const adminAcl = {
    "paths": {
        "/v1/sessions/**": {},
        "/v1/users/**": {},
        "/v1/conversations/**": {}
    }
}

const nonAdminAcl = {
    "paths": {
        "/v1/sessions/**": {
            "methods": ["GET"]
        },
        "/v1/users/*": {
            "methods": ["GET"]
        },
        "/v1/conversations/*": {
            "methods": ["GET", "POST", "PUT"]
        }
    }
}

//PROMISIFY ME
const createConversation = (displayName) => {
    var displayName = "Chat Demo"

    nexmo.conversations.create({
        display_name: displayName
    }, (error, response) => {
        if (error) {
            return error
        } else {
            return response
        }
    })
}

//promisify me
const modifyConversation = (conversationId, userId, action) => {
    nexmo.conversations.members.add(conversationId, {
        "action": action,
        "user_id": userId,
        "channel": {
            "type": "app"
        }
    }, (error, response) => {
        if (error) {
            return error
        } else {
            return response
        }
    })
}

const getConversations = () => {
    nexmo.conversations.get({}, (error, response) => {
        if (error) {
            return error
        } else {
            return response
        }
    });
}

//PROMISIFY ME
const createUser = (userName, admin) => {
    nexmo.users.create({
        name: username
    }, (error, response) => {
        if (error) {
            return error
        } else {
            res.json({
                user: response,
                user_jwt: Nexmo.generateJwt(process.env.NEXMO_API_KEY, {
                    application_id: process.env.NEXMO_APP_ID,
                    sub: username,
                    exp: new Date().getTime() + 86400,
                    acl: admin ?
                        adminAcl : nonAdminAcl
                })
            })
        }
    })
}

//promisify me
const getUsers = () => {
    nexmo.users.get({}, (error, response) => {
        if (error) {
            return error
        } else {
            return response
        }
    });
}

const getUser = () => {
    var admin = req.query.admin
    nexmo.users.get({}, (error, response) => {
        if (error) {
            res.json(error)
        } else {
            var filteredUsers = response.filter(user => user.name == req.params.user)
            if (filteredUsers.length === 0) {
                res.json({
                    error: "User not found"
                })
            } else {
                res.json({
                    user_jwt: Nexmo.generateJwt(process.env.NEXMO_API_KEY, {
                        application_id: process.env.NEXMO_APP_ID,
                        sub: req.params.user,
                        exp: new Date().getTime() + 86400,
                        acl: admin ?
                            adminAcl : nonAdminAcl
                    })
                });
            }
        }
    });
}
module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getJwt = getJwt;
module.exports.createConversation = createConversation;
module.exports.modifyConversation = modifyConversation;