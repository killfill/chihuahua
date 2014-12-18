
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Datasets = module.exports = new Store()

//Order by Name
Datasets.sortBy = function(a, b) {

    var _a = a.name.toLowerCase() + a.version,
        _b = b.name.toLowerCase() + b.version

    if (_a < _b) return -1
    if (_a > _b) return 1
    return 0
}

D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'DATASETS_LIST':
            Datasets.setDataArray(action.list, 'uuid')
            break;

        // default:
        //  return true //Needed by promise in Dispatcher.

    }

    Datasets.emit()
    return false
})