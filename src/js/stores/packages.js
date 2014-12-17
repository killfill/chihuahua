
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Packages = module.exports = new Store()

D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'PACKAGES_LIST':
            Packages.setDataArray(action.list, 'uuid')
            break;

        // default:
        //  return true //Needed by promise in Dispatcher.

    }

    Packages.emit()
    return false
})