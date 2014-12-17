
var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,

	//Pages
	Layout = require('./pages/layout.jsx'),
    Dashboard = require('./pages/dashboard.jsx'),
    Machines = require('./pages/machines.jsx'),
    Datasets = require('./pages/datasets.jsx'),
    Logout = require('./pages/logout.jsx')


module.exports = (
    <Route name='root' path='/' handler={Layout}>
        <Route name='machines' handler={Machines}/>
        <Route name='datasets' handler={Datasets}/>
        <Route name='logout' handler={Logout}/>
        <DefaultRoute handler={Dashboard} />
    </Route>
)