
var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.jsx')


//Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
require("react-tap-event-plugin")();


//If session is saved in localStorage, trigger the login event, just like a successful login...
if (localStorage.userSession) {
    var userSession = JSON.parse(localStorage.userSession),
        loginResult = require('./actions').session.loginResult

    loginResult({
        success: true,
        data: userSession.data,
        endpoint: userSession.endpoint
    })
}


Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('here'))
})


if (process.env.NODE_ENV !== 'production')
    require('./live-reload')