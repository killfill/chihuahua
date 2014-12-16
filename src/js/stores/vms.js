
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Vms = module.exports = new Store()

D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'VMS_NEW':
            Vms.set(action.vm.uuid, action.vm)
            break;

        case 'VMS_LIST':
            Vms.setDataArray(action.vms, 'uuid')
            break;

        // default:
        //  return true //Needed by promise in Dispatcher.

    }

    console.log('Dispacheado!', action.actionType)
    Vms.emit()
    return false
})