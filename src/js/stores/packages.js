
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Packages = module.exports = new Store({resource: 'packages'})

Packages.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'PACKAGES_LIST_RES':
            Packages.setDataArray(action.list, 'uuid')
            Packages.emit()
            break;

        case 'SESSION_LOGIN_RES':
            Packages.requestList()
            Packages.emit()
            break;

    }

    return false
})