var React = require('react'),
    Router = require('react-router'),
    Session = require('../stores/session'),
    Actions = require('../actions'),

    routes = require('../routes.jsx'),
    helpers = require('./helpers')

module.exports = {

    //App starter
    app: function() {

        //Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
        require("react-tap-event-plugin")()

        this.tryReuseToken()

        Router.run(routes, function(Handler, state) {
            React.render(<Handler/>, document.body)
        })

    },


    //Trigger login event if user were previously logged
    tryReuseToken: function() {

        if (localStorage.endpoint) {
            Session.set('endpoint', localStorage.endpoint)
        }

        if (localStorage.token) {
            Session.set('token', localStorage.token)
        }

        if (localStorage.userSession) {
            var userSession = JSON.parse(localStorage.userSession)

            helpers.connectToFiFo(localStorage.endpoint)

            Actions.session.loginSuccess({
                success: true,
                token: localStorage.token,
                data: userSession.data
            })
        }
    }


}
