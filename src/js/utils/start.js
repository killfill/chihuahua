var React = require('react'),
    Router = require('react-router'),
    Session = require('../stores/session'),
    Actions = require('../actions'),

    routes = require('../routes.jsx'),
    helpers = require('./helpers'),

    //Need to include howl from somewhere...
    Howl = require('../stores/howl')

module.exports = {

    //App starter
    app: function() {

        //Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
        require("react-tap-event-plugin")()

        this.tryReuseToken(function() {

            Router.run(routes, function(Handler, state) {

                //trigger actions based on the route.
                var route = state.routes[state.routes.length-1]
                switch (route.name) {
                    case 'machine':
                        Actions.vms.selected(state.params.uuid)
                        break;
                }

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

            if (err) {
                document.location.hash = '#/login'
                Actions.session.logout('Could not validate token')
                console.error(err.message)
                return cb()
            }

            if (res.statusCode !== 200) {
                document.location.hash = '#/login'
                Actions.session.logout('Invalid token')
                return cb()
            }

            Actions.session.loginSuccess({
                success: true,
                token: token,
                data: body,
                endpoint: endpoint
            })
            return cb()

        })

    }


}
