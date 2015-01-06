
var Store = require('../utils/Store.js'),
    D = require('../dispatcher'),
    Actions = require('../actions'),
    Vms = require('./vms'),
    Users = require('./users')

var Vm = module.exports = new Store({
    resource: 'vms'
})

Vm.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'VM_SELECTED':
            //Clear previous selected vm data.
            Vm.clear()

            var uuid = action.uuid

            Vm.set('uuid', uuid)
            setVm(Vms.get(uuid))
            break;

    }

    return true
})

function setVm(vm) {
    if (!vm) return

    Vm.set('vm', vm)
    Vm.emit()

    //Lets get the user who owns the vm.
    if (vm.config.owner)
        Users.request(vm.config.owner)
}


//If we dont have the vm already, wait for the main vm list, and see if its there
Vms.subscribe(function(list) {
    if (Vm.get('vm')) return

    var vm = Vms.get(Vm.get('uuid'))
    setVm(vm)
})

//Receive the user data
Users.subscribe(function(users) {
    var vm = Vm.get('vm')

    Vm.set('user', Users.get(vm.config.owner))
    Vm.emit()
})
