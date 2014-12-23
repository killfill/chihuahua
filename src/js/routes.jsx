var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Pages = require('./pages')

module.exports = (
    <Route name='root' path='/' handler={Pages.layout}>
        <Route name='machines' handler={Pages.machines}>
            <Route name='machine' path=':uuid' handler={Pages.machine} />
        </Route>
        <Route name='datasets' handler={Pages.datasets}/>
        <Route name='login' handler={Pages.login}/>
        <Route name='logout' handler={Pages.logout}/>
        <DefaultRoute handler={Pages.dashboard} />
    </Route>
)