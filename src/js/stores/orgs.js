
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Orgs = module.exports = new Store({resource: 'orgs'})

Orgs.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_RES':
            Orgs.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Orgs.clear()
            break;
    }

    return false
})