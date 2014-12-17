
var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.jsx')


//Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
require("react-tap-event-plugin")();


Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('here'))
})

// require('./actions').session.login('https://nube.virtualizado.cl', 'user', 'pass')

if (process.env.NODE_ENV !== 'production')
    require('./live-reload')