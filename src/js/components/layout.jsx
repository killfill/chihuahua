var React = require('React'),
    mui = require('material-ui'),
    Gravatar = require('./gravatar.jsx'),
    List = require('./list.jsx')

var AppCanvas = mui.AppCanvas,
    AppBar = mui.AppBar,
    FloatingActionButton = mui.FloatingActionButton

var SidebarHeader = React.createClass({
    render: function() {
        var username = 'pneumann@gmail.com',
            size = 32
        return (<div className='sidebar-header'>
            <div className='icon' style={{width: size}}>
                <mui.Paper zDepth={1} circle={true} style={{overflow: 'hidden', height: size, height: size}}>
                    <Gravatar email={username} size={size} />
                </mui.Paper>
            </div>
            <div className='username'>{username}</div>
        </div>)
    }
})

module.exports = React.createClass({
    render: function() {

        var menuItems = [
          { route: 'get-started', text: 'Dashboard', icon: 'action-dashboard'},
          { route: 'get-started', text: 'Machines', icon: 'hardware-desktop-windows', number: "13"},
          { route: 'css-framework', text: 'Datasets', icon: 'image-blur-linear'},
          { route: 'components', text: 'Nodes', icon: 'device-storage'},
          { route: 'exit', text: 'Log out' }
        ];

        rightMenuItems = [
          { payload: '1', text: 'Hello' },
          { payload: '2', text: 'There' }
        ];

        var title = 'Home'
        var item = {
            image: 'https://nube.virtualizado.cl/images/logos/linux.png',
            title: 'Ubuntu thingy',
            date: '1:47pm',
            description: 'Esta es una linda descripción que tiene mucho texto que debe codsksdakdhjsads adhjksads adhjksadjks rtarse,',
            icon2: 'http://img2.wikia.nocookie.net/__cb20130620210048/inciclopedia/images/1/18/Estrella_amarilla.png',
            icons: ['communication-email']
        }

        return (
            <AppCanvas predefinedLayout={1}>

                <AppBar title={title} onMenuIconButtonTouchTap={this.menuToggle}>
                    <mui.DropDownIcon comentario='estos son contextuales...' icon="navigation-more-vert" menuItems={rightMenuItems} />
                    <mui.IconButton icon="action-search" />
                </AppBar>

                <mui.LeftNav className='sidebar-menu' ref="sidebar" header={<SidebarHeader/>} menuItems={menuItems} selectedIndex={0} docked={false} isInitiallyOpen={false} onChange={this.menuSelected} />
                <mui.FloatingActionButton className='create-vm-button' icon="content-add" mini={true} />

                <List items={[item, item, item, item, item, item, item, item, item]}/>

            </AppCanvas>
        )

    },

    menuSelected: function(e, idx, item) {
        console.log('---->', item, idx)
        // this.transitionTo(payload.route);
    },

    menuToggle: function() {
        console.log('uuuh')
        this.refs.sidebar.toggle()
    }
})

