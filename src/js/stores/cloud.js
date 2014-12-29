
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Cloud = module.exports = new Store({resource: 'cloud'})

Cloud.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGOUT':
            Cloud.clear()
            break;

    }

    return false
})