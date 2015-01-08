
var AjaxStore = require('../utils/AjaxStore.js'),
    D = require('../dispatcher')

var Orgs = module.exports = new AjaxStore({resource: 'orgs'})

Orgs.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_OK':
            Orgs.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Orgs.clear()
            break;
    }

    return false
})