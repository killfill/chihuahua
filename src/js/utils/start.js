var React = require('react'),
    Router = require('react-router'),
    Session = require('../stores/session'),
    SessionAction = require('../actions/session'),

    routes = require('../routes.jsx'),
    helpers = require('./helpers')

module.exports = {

    //App starter
    app: function() {

        //Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
        require("react-tap-event-plugin")()

        this.tryReuseToken(function() {
            Router.run(routes, function(Handler, state) {
                React.render(<Handler/>, document.body)
            })
        })
    },


    tryReuseToken: function(cb) {

        var endpoint = localStorage.endpoint,
            token = localStorage.token

        if (endpoint)
            Session.set('endpoint', endpoint)

        if (!token) return cb()

        //Lets see if our token is valid
        helpers.connectToFiFo(endpoint)

        React.render(<div className='center'>Validating token</div>, document.getElementsByClassName('center')[0])

        fifo.send('sessions').get(token, function(err, res, body) {

            if (err || res.statusCode !== 200) {
                document.location.hash = '#/login'
                SessionAction.logout('Invalid token')
                return cb()
            }

            SessionAction.loginSuccess({
                success: true,
                token: token,
                data: body
            })
            return cb()

        })

    }


}
