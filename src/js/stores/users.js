
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Users = module.exports = new Store({resource: 'users'})

Users.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGOUT':
            Users.clear()
            break;
    }

    return false
})