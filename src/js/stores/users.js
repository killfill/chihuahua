
var AjaxStore = require('../utils/AjaxStore.js'),
    D = require('../dispatcher')

var Users = module.exports = new AjaxStore({resource: 'users'})

Users.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGOUT':
            Users.clear()
            break;
    }

    return false
})