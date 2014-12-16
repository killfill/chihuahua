
var React = require('react'),
    Layout = require('./components/layout.jsx'),
    Actions = require('./actions')


//Needed for onTouchTap - Can go away when react 1.0 release - Check this repo: https://github.com/zilverline/react-tap-event-plugin
require("react-tap-event-plugin")();

React.render(<Layout/>, document.getElementById('here'))

// Actions.session.login('https://nube.virtualizado.cl', 'user', 'pass')

if (process.env.NODE_ENV !== 'production')
    require('./live-reload')

