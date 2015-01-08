
var AjaxStore = require('../utils/AjaxStore.js'),
    D = require('../dispatcher')

var Datasets = module.exports = new AjaxStore({resource: 'datasets'})

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

        case 'SESSION_LOGIN_OK':
            Datasets.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Datasets.clear()
            break;

    }

    return false
})