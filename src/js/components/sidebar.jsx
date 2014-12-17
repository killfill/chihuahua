var React = require('react'),
    mui = require('material-ui'),
    Gravatar = require('./gravatar.jsx')

var SidebarHeader = React.createClass({
    render: function() {

        var username = 'pneumann@gmail.com',
            size = 32

        var userIcon = <mui.Icon icon='social-person' style={{padding: '4px'}} />
        if (username.indexOf('@') >- 1)
            userIcon = (
                <mui.Paper zDepth={1} circle={true} style={{overflow: 'hidden', height: size, height: size}}>
                    <Gravatar email={username} size={size} />
                </mui.Paper>
            )

        return (<div className='sidebar-header'>
            <div className='icon' style={{width: size}}>{userIcon}</div>
            <div className='username'>{username}</div>
        </div>)
    }
})

var menuItems = [
    { route: 'get-started', text: 'Dashboard', icon: 'action-dashboard'},
    { route: 'get-started', text: 'Machines', icon: 'hardware-desktop-windows', number: "13"},
    { route: 'css-framework', text: 'Datasets', icon: 'action-wallet-travel'},
    { route: 'components', text: 'Nodes', icon: 'device-storage'},
    { route: 'exit', text: 'Log out', icon: 'action-label-outline' }
];

module.exports = React.createClass({
    render: function() {
        return (
            <mui.LeftNav className='sidebar-menu' ref="leftnav" 
            header={<SidebarHeader/>} menuItems={menuItems} 
            selectedIndex={0} docked={false} isInitiallyOpen={false} 
            onChange={this.menuSelected} />
        )
    },

    toggle: function() {
        this.refs.leftnav.toggle()
    }

})
