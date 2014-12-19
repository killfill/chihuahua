
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Datasets = module.exports = new Store({resource: 'datasets'})

//Order by Name
Datasets.sortBy = function(a, b) {

    var _a = a.name.toLowerCase() + a.version,
        _b = b.name.toLowerCase() + b.version

    if (_a < _b) return -1
    if (_a > _b) return 1
    return 0
}

Datasets.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'DATASETS_LIST_RES':
            Datasets.setDataArray(action.list, 'uuid')
            Datasets.emit()
            break;

        case 'SESSION_LOGIN_RES':
            Datasets.requestList()
            Datasets.emit()
            break;

    }

    return false
})