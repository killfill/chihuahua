
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Packages = module.exports = new Store({resource: 'packages'})

Packages.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_OK':
            Packages.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Packages.clear()
            break;

    }

    return false
})