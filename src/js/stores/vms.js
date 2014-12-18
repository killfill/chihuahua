
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Vms = module.exports = new Store()

//Order by last log (history)
Vms.sortBy = function(a, b) {

    //Assume the last log is the newer one.
    var _a = a.log[a.log.length-1].date,
        _b = b.log[b.log.length-1].date

    return _b - _a
}

D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'VMS_NEW':
            Vms.set(action.vm.uuid, action.vm)
            break;

        case 'VMS_LIST':
            Vms.setDataArray(action.list, 'uuid')
            break;

        // default:
        //  return true //Needed by promise in Dispatcher.

    }

    Vms.emit()
    return false
})