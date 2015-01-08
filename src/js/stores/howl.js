
var Store = require('../utils/Store.js'),
    D = require('../dispatcher'),
    Vms = require('./vms'),
    Vm = require('./vm'),
    HowlConnector = require('../utils/howl-connector')

var Howl = module.exports = new Store().mergeWith({

    resetStore: function() {
        this.clear()
        this.set('connected', false)
        this.set('channels', [])
    },

    join: function(id) {

        var channels = Howl.get('channels')

        //Ignore duplicate calls.
        if (channels.indexOf(id) > -1)
            return false

        connection.send({join: id})
        channels.push(id)

        console.log('joining ' + id + ' ...')
    },

    leave: function(id) {

        var channels = Howl.get('channels'),
            idx = channels.indexOf(id)

        if (idx < 0)
            throw new Error('Cannot leave unknown channel: ' + id)

        connection.send({leave: id})
        channels.splice(idx, 0)

        console.log('leaving ' + id + ' ...')
    }

})

Howl.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_OK':
            connection.connect(action.endpoint.replace('http', 'ws') + '/howl', action.token)
            Vms.subscribe(joinChannels)
            break;

        case 'SESSION_LOGOUT':
            leaveChannels()
            connection.disconnect()
            Vms.unsubscribe(joinChannels)
            break;
    }

    return false
})

Howl.resetStore()


var connection = new HowlConnector({
    onLogin: function() {
        Howl.set('connected', true)
        joinChannels()
        Howl.emit()
    },

    onDisconnect: function() {
        Howl.resetStore()
        Howl.emit()
    },

    onMsg: function(msg) {
        handleMessage(msg)
    }
})


//Handle message from the backend
function handleMessage(obj) {

    var chan = obj.channel,
        msg = obj.message,
        vm = Vms.get(chan)

    if (!chan || !vm) return

    switch (msg.event) {
        case 'log':
            vm.log.push(msg.data)
            emitVm()
            break;

        case 'state':
            vm.state = msg.data
            emitVm()
            break;

        case 'services':
            vm.services = msg.data
            emitVm()
            break;

        default:
            console.log('unhandled msg:', msg)
    }

}


//Join to the saved channels
function joinChannels() {

    if (!Howl.get('connected'))
        return

    var list = Vms.getAll().map(function(vm) {return vm.uuid})
    list.map(Howl.join)
}

//Leave the joined channels
function leaveChannels() {
    Howl.get('channels').map(Howl.leave)
}

function emitVm() {
    Vms.emit()

    //If there is a currently selected VM, emit that store too.
    if (Vm.get('vm'))
        Vm.emit()
}