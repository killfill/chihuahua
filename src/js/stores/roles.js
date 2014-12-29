
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Roles = module.exports = new Store({resource: 'roles'})

Roles.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_RES':
            Roles.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Roles.clear()
            break;

    }

    return false
})