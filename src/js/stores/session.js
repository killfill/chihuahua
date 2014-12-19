
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Session = module.exports = new Store()

var defaultState = Session.set('state', {
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
            Session.emit()
            break;

        case 'SESSION_LOGIN_RES':
            var state = Session.set('state', {
                isPending: false,
                isLogged: action.success,
                error: action.error,
                data: action.data,
                endpoint: action.endpoint
            })
            localStorage.setItem('userSession', JSON.stringify(state))
            Session.emit()
            break;

        case 'SESSION_LOGOUT':
            Session.set('state', defaultState)
            localStorage.removeItem('userSession')
            fifo.token = null
            break;

        default:
            return false

    }

    return true
})