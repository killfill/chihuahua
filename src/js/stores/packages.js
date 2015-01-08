
var AjaxStore = require('../utils/AjaxStore.js'),
    D = require('../dispatcher')

var Packages = module.exports = new AjaxStore({resource: 'packages'})

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