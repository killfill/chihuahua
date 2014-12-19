var FiFo = require('nfifo/fifo'),
    D = require('../dispatcher'),
    Session = require('../stores/session')

function createFifo(opts) {

    if (typeof fifo !== 'undefined')
        return

    fifo = new FiFo(opts.endpoint)
    fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
    fifo.defaultParams.json = false

    if (opts.token)
        fifo.token = opts.token

}

module.exports = {
    login: function(endpoint, login, password) {

        createFifo({
            endpoint: endpoint
        })

        D.handleViewAction({
            actionType: 'SESSION_LOGIN_REQ'
        })

        fifo.login(login, password, function(err, res, body) {

            this.loginResult({
                success: res? res.statusCode === 200: false,
                error: err? err.message: null,
                data: body || {},
                endpoint: endpoint
            })

        }.bind(this))
    },

    loginResult: function(params) {

        createFifo({
            endpoint: params.endpoint,
            token: params.data.session
        })

        D.handleServerAction({
            actionType: 'SESSION_LOGIN_RES',
            success: params.success,
            error: params.error,
            data: params.data,
            endpoint: params.endpoint
        })
    },

    logout: function() {
        D.handleServerAction({
            actionType: 'SESSION_LOGOUT'
        })
    }

}