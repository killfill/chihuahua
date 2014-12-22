var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    RouteHandler = require('react-router').RouteHandler,

    Sidebar = require('../components/sidebar.jsx'),
    List = require('../components/list.jsx'),
    titelize = require('../utils/helpers').titelize,
    Session = require('../stores/session')

module.exports = React.createClass({

    mixins: [Router.State],

    render: function() {

        rightMenuItems = [
          { payload: '1', text: 'Hello' },
          { payload: '2', text: 'There' }
        ];

        var title = titelize(this.getPath().slice(1))
        if (!title) title = 'Dashboard'

        if (!Session.get('token'))
            return <RouteHandler/>

        return (
            <mui.AppCanvas predefinedLayout={1}>

                <mui.AppBar title={title} onMenuIconButtonTouchTap={this.menuToggle}>
                    <mui.DropDownIcon icon='navigation-more-vert' menuItems={rightMenuItems} />
                    <mui.IconButton icon='action-search' tooltip='Search' />
                </mui.AppBar>

                <Sidebar ref='sidebar' />
                <mui.FloatingActionButton className='create-vm-button' icon='content-add' mini={true} />

                <div className='mui-app-content-canvas'>
                    <RouteHandler/>
                </div>


            </mui.AppCanvas>
        )

    },

    menuToggle: function() {
        this.refs.sidebar.toggle()
    }
})
