var D = require('../dispatcher'),
    Session = require('../stores/session'),
    helpers = require('../utils/helpers')

module.exports = {
    login: function(endpoint, login, password) {

        helpers.connectToFiFo(endpoint)

        D.handle({
            actionType: 'SESSION_LOGIN_REQ',
            endpoint: endpoint
        })

        fifo.login(login, password, function(err, res, body) {

            if (err || res.statusCode !== 200)
                this.loginFailed({error: err? err.message: body})

            else
                this.loginSuccess({
                    token: body.session,
                    data: body,
                    endpoint: endpoint
                })

        }.bind(this))
    },

    loginSuccess: function(params) {

        fifo.token = params.token

        D.handle({
            actionType: 'SESSION_LOGIN_OK',
            success: true,
            data: params.data,
            token: params.token,
            endpoint: params.endpoint
        })
    },

    loginFailed: function(params) {

        D.handle({
            actionType: 'SESSION_LOGIN_ERR',
            success: false,
            error: params.error
        })
    },

    logout: function(msg) {
        fifo.send('sessions').delete(Session.get('token'), function() {})
        D.handle({
            actionType: 'SESSION_LOGOUT',
            msg: msg
        })
    }

}