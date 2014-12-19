
var Store = require('../utils/Store.js'),
    D = require('../dispatcher'),
    Actions = require('../actions'),
    Session = require('./session')

var Vms = module.exports = new Store({resource: 'vms'})

//Order by last log (history)
Vms.sortBy = function(a, b) {

    //Assume the last log is the newer one.
    var _a = a.log[a.log.length-1].date,
        _b = b.log[b.log.length-1].date

    return _b - _a
}

Vms.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'VMS_LIST_RES':
            Vms.setDataArray(action.list, 'uuid')
            break;

        case 'SESSION_LOGIN_RES':
            Vms.requestList()
            break;
    }

    Vms.emit()
    return true
})