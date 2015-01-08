
var AjaxStore = require('../utils/AjaxStore.js'),
    D = require('../dispatcher')

var Roles = module.exports = new AjaxStore({resource: 'roles'})

Roles.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_OK':
            Roles.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Roles.clear()
            break;

    }

    return false
})