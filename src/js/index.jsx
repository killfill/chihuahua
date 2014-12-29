var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.jsx'),
    Actions = require('./actions'),
    Start = require('./utils/start')


//Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
require("react-tap-event-plugin")();

Start.fromSavedState()

Router.run(routes, function(Handler, state) {
    React.render(<Handler/>, document.body)
})

if (process.env.NODE_ENV !== 'production')
    require('./live-reload')