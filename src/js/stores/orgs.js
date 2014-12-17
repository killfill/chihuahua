
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Datasets = module.exports = new Store()

D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'ORGS_LIST':
            Datasets.setDataArray(action.list, 'uuid')
            break;

        // default:
        //  return true //Needed by promise in Dispatcher.

    }

    Datasets.emit()
    return false
})