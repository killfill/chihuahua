var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Pages = require('./pages')

module.exports = (
    <Route name='root' path='/' handler={Pages.layout}>
        <Route name='machines' handler={Pages.machines} />
        <Route name='datasets' handler={Pages.datasets}/>
        <Route name='login' handler={Pages.login}/>
        <Route name='logout' handler={Pages.logout}/>
        <Route name='machine' path='machines/:uuid' handler={Pages.machine} />
        <DefaultRoute name='dashboard' handler={Pages.dashboard} />
    </Route>
)