
var Store = require('../utils/Store.js'),
    D = require('../dispatcher'),
    Vms = require('./vms')
    HowlHelper = require('../utils/howl-helper')

var Howl = module.exports = new Store({resource: 'asdasd'})

Howl.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_OK':
            helper.connect(action.endpoint.replace('http', 'ws') + '/howl', action.token)
            Vms.subscribe(joinChannels)
            break;

        case 'SESSION_LOGOUT':
            leaveChannels()
            helper.disconnect()
            Vms.unsubscribe(joinChannels)
            break;
    }

    return false
})

//Set the default values
Howl.initStore = function() {
    Howl.clear()
    Howl.set('connected', false)
    Howl.set('channels', [])
}
Howl.initStore()


Howl.join = function(id) {

    var chans = Howl.get('channels')

    if (chans.indexOf(id) > -1)
        return false //Just ignore duplicate calls.
        // throw new Error('Channel already subscribed: ' + id)

    console.log('joining ' + id + ' ...')

    helper.send({join: id})
    chans.push(id)
}

Howl.leave = function(id) {

    var chans = Howl.get('channels'),
        idx = chans.indexOf(id)

    if (idx < 0)
        throw new Error('Cannot leave unknown channel: ' + id)

    console.log('leaving ' + id + ' ...')

    helper.send({leave: id})
    chans.splice(idx, 0)
}


var helper = new HowlHelper({
    onLogin: function() {
        Howl.set('connected', true)
        joinChannels()
        Howl.emit()
    },

    onDisconnect: function() {
        Howl.initStore()
        Howl.emit()
    },

    onMsg: function(msg) {
        console.log('#: onMsg', msg)
    }
})


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
