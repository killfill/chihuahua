var D = require('../dispatcher'),
    Session = require('../stores/session'),
    helpers = require('../utils/helpers')

module.exports = {
    login: function(endpoint, login, password) {

        helpers.connectToFiFo(endpoint)

        D.handleViewAction({
            actionType: 'SESSION_LOGIN_REQ',
            endpoint: endpoint
        })

        fifo.login(login, password, function(err, res, body) {

            this.loginResult({
                success: res? res.statusCode === 200: false,
                error: err? err.message: null,
                token: body && body.session,
                data: body || {},
                endpoint: endpoint
            })

        }.bind(this))
    },

    loginResult: function(params) {

        if (params.token)
            fifo.token = params.token

        D.handleServerAction({
            actionType: 'SESSION_LOGIN_RES',
            success: params.success,
            error: params.error,
            data: params.data,
            token: params.token
        })
    },

    logout: function() {
        D.handleViewAction({
            actionType: 'SESSION_LOGOUT'
        })
    }

}