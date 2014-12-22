var Session = require('../stores/session'),
    Actions = require('../actions'),
    helpers = require('./helpers')

module.exports = {
    fromSavedState: function() {

        if (localStorage.endpoint) {
            Session.set('endpoint', localStorage.endpoint)
        }

        if (localStorage.token) {
            Session.set('token', localStorage.token)
        }

        if (localStorage.userSession) {
            var userSession = JSON.parse(localStorage.userSession)

            helpers.connectToFiFo(localStorage.endpoint)

            Actions.session.loginResult({
                success: true,
                token: localStorage.token,
                data: userSession.data
            })
        }
    }
}
