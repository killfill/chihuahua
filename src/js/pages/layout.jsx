var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    RouteHandler = require('react-router').RouteHandler,

    Sidebar = require('../components/sidebar.jsx'),
    AppButtons = require('../components/app-buttons.jsx'),
    Notifications = require('../components/notifications.jsx'),

    titelize = require('../utils/helpers').titelize,
    Session = require('../stores/session'),

    AppBar = require('../utils/patches/AppBar_patched.jsx'),
    triggerAction = require('../actions').appBar.trigger


module.exports = React.createClass({

    mixins: [Router.State, Router.Navigation],

    render: function() {

        if (!Session.get('token'))
            return <RouteHandler/>

        var routePath = this.getRoutes()[this.getRoutes().length-1].path,
            isDetailPage = routePath.indexOf(':uuid') > -1

        var title = ''
        if (!isDetailPage) {
            title = titelize(this.getPath().slice(1))
            if (!title) title = 'Dashboard'
        }

        return (
            <mui.AppCanvas predefinedLayout={1}>
                <AppBar title={title}
                    onMenuIconButtonTouchTap={this.menuToggle.bind(null, isDetailPage)}
                    icon={isDetailPage? 'navigation-arrow-back': 'navigation-menu'}>
                    <AppButtons/>
                </AppBar>

                <Sidebar ref='sidebar' />
                <mui.FloatingActionButton className='create-vm-button' icon='content-add' mini={true} onTouchTap={triggerAction('machine', 'create')} />
                <div className='mui-app-content-canvas'>
                    <RouteHandler/>
                </div>
                <Notifications/>
            </mui.AppCanvas>
        )

    },
    menuToggle: function(isDetailPage) {
        if (isDetailPage)
           this.transitionTo('machines')
        else
            this.refs.sidebar.toggle()
    }
})
