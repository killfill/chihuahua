
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Session = module.exports = new Store()

Session.set('state', {
    isPending: false,
    isLogged: false,
    error: null,
    data: {}
})

Session.dispatchToken = D.register(function(payload) {

    var action = payload.action,
        source = payload.source

    switch (action.actionType) {

        case 'SESSION_LOGIN_REQ':
            Session.get('state').isPending = true
            Session.get('state').error = null
            break;

        case 'SESSION_LOGIN_RES':
            Session.set('state', {
                isPending: false,
                isLogged: action.success,
                error: action.error,
                data: action.body
            })
            break;
            
        default:
            return false

    }

    Session.emit()
    return true
})