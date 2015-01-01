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

            if (err || res.statusCode !== 200)
                this.loginFailed({error: err? err.message: body})

            else
                this.loginSuccess({
                    token: body.session,
                    data: body
                })

        }.bind(this))
    },

    loginSuccess: function(params) {

        fifo.token = params.token

        D.handleServerAction({
            actionType: 'SESSION_LOGIN_OK',
            success: true,
            data: params.data,
            token: params.token
        })
    },

    loginFailed: function(params) {

        D.handleServerAction({
            actionType: 'SESSION_LOGIN_ERR',
            success: false,
            error: params.error
        })
    },

    logout: function() {
        D.handleViewAction({
            actionType: 'SESSION_LOGOUT'
        })
    }

}