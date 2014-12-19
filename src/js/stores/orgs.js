
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Orgs = module.exports = new Store({resource: 'orgs'})

Orgs.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'ORGS_LIST_RES':
            Orgs.setDataArray(action.list, 'uuid')
            Orgs.emit()
            break;

        case 'SESSION_LOGIN_RES':
            Orgs.requestList()
            Orgs.emit()
            break;
    }

    return false
})