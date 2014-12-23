var React = require('react'),
    mui = require('material-ui'),
    Router = require('react-router'),
    Gravatar = require('./gravatar.jsx'),

    Vms = require('../stores/vms'),
    Session = require('../stores/session'),
    Org = require('../stores/orgs')

var SidebarHeader = React.createClass({

    getInitialState: function() {

        return {
            username: Session.get('current').data.name,
            orgID: Session.get('current').data.org
        }
    },

    componentDidMount: function() {
        Session.subscribe(this.sessionChanged)
    },

    componentWillUnmount: function() {
        Session.unsubscribe(this.sessionChanged)
    },

    sessionChanged: function(){
        this.setState({
            username: Session.get('current').data.name,
            orgID: Session.get('current').org
        })
    },

    render: function() {

        var username = this.state.username,
            org = this.state.orgID? Org.get(this.state.orgID): false,
            size = 32

        var userIcon = username.indexOf('@') >- 1
            ? (<mui.Paper zDepth={1} circle={true} style={{overflow: 'hidden', height: size, height: size}}>
                    <Gravatar email={username} size={size} />
                </mui.Paper>)
            : <mui.Icon icon='social-person' style={{padding: '4px'}} />

        var detail = org
            ? (<span>
                    <mui.Icon icon='action-account-balance'/>
                    <span className='org'>{org.name}</span>
                </span>)
            : <span></span>

        return (<div className='sidebar-header'>
            <div className='icon' style={{width: size}}>{userIcon}</div>
            <div className='description'>
                <div className='username'>{username}</div>
                {detail}
            </div>
        </div>)
    }
})

module.exports = React.createClass({

    mixins: [Router.Navigation, Router.State],

    getInitialState: function() {
        return {
            menuItems: [
                { route: '/', text: 'Dashboard', icon: 'action-dashboard'},
                { route: '/machines', text: 'Machines', icon: 'hardware-desktop-windows', number: Vms.getAll().length.toString() || ''},
                { route: '/datasets', text: 'Datasets', icon: 'action-wallet-travel'},
                // { route: 'noders', text: 'Nodes', icon: 'device-storage'},
                { route: '/logout', text: 'Logout', icon: 'action-label-outline' }
            ]
        }
    },

    componentDidMount: function() {
        Vms.subscribe(this.vmsChanged)
    },

    componentWillUnmount: function() {
        Vms.unsubscribe(this.vmsChanged)
    },

    vmsChanged: function(vms) {
        this.state.menuItems[1].number = vms.length.toString()
        this.setState({menuItems: this.state.menuItems})
    },

    render: function() {
        return (
            <mui.LeftNav
                className='sidebar-menu'
                ref='leftnav'
                header={<SidebarHeader/>}
                menuItems={this.state.menuItems}
                selectedIndex={this.getSelectedMenu()}
                docked={false}
                isInitiallyOpen={false}
                onChange={this.menuSelected} />
        )
    },

    toggle: function() {
        this.refs.leftnav.toggle()
    },

    menuSelected: function(e, key, menu) {
        this.transitionTo(menu.route)
    },

    //Get the menu that should be selected, from the URL
    getSelectedMenu: function() {
        for (var i=0; i < this.state.menuItems.length; i++) {
            var menu = this.state.menuItems[i]
            if (this.isActive(menu.route))
                return i
        }
    }

})
