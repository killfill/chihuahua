
var Store = require('../utils/Store.js'),
    D = require('../dispatcher')

var Session = module.exports = new Store()

var defaultSession = Session.set('current', {
    isPending: false,
    isLogged: false,
    error: false,
    data: {}
})

Session.dispatchToken = D.register(function(payload) {

    var action = payload.action,
        source = payload.source

    switch (action.actionType) {

        case 'SESSION_LOGIN_REQ':
            Session.get('current').isPending = true
            Session.get('current').error = false

            //Remember the endpoint
            Session.set('endpoint', action.endpoint)
            localStorage.endpoint = action.endpoint

            Session.emit()
            break;

        case 'SESSION_LOGIN_OK':
        case 'SESSION_LOGIN_ERR':

            var state = Session.set('current', {
                isPending: false,
                isLogged: action.success,
                error: action.error,
                data: action.data
            })

            //Remember the token and user session.
            if (state.isLogged) {
                Session.set('token', action.token)
                localStorage.token = action.token                
            }

            Session.emit()
            break;

        case 'SESSION_LOGOUT':
            Session.set('current', defaultSession)
            Session.get('current').error = action.msg || false
            Session.remove('token')
            localStorage.removeItem('token')
            fifo.token = null
            Session.emit()
            break;


        case 'APP_BAR':
            if (action.context === 'dashboard' && action.actionName === 'about') {
                Session.set('about', !Session.get('about'))
                Session.emit()
            }
            break;

        default:
            return false

    }

    return true
})