var Router = require('react-router'),
	Session = require('../stores/session')

//https://github.com/rackt/react-router/blob/master/docs/api/components/RouteHandler.md

module.exports = {
    statics: {
        willTransitionTo: function(transition, params) {
            var isLogged = Session.get('current').isLogged
            if (!isLogged)
                transition.redirect('/login')
        }
    }
}