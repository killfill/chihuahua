var React = require('React'),
    mui = require('material-ui'),
    Gravatar = require('./gravatar.jsx'),
    List = require('./list.jsx'),
    LoginDialog = require('./login-dialog.jsx'),
    Vms = require('../stores/vms')

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


function title(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}

module.exports = React.createClass({


    getInitialState: function() {
        return {
            listItems: []
        }
    },

    VmsListChanged: function(vms) {

        var items = vms.map(function(vm) {

            return {
                image: 'https://nube.virtualizado.cl/images/logos/linux.png',
                title: title(vm.config.alias),
                date: title(vm.state),
                description:
                    title("ubuntun") + ' ' + 'XXX14.02' + '. ' +
                    title('small') + ' machine with ' + (vm.config.ram/1024) + 'GB Ram, ' +
                    (vm.config.vcpus || (vm.config.cpu_cap / 100)) + 'vCPU and ' + vm.config.quota + 'GB disk. Created 3 years ago. ' +
                    (vm.owner? ('Owned by ' + vm.owner): ''),
                icons: this.iconsOfVM(vm)
            }
        }.bind(this))
        
        this.setState({listItems: items})

    },
    componentDidMount: function() {
        Vms.subscribe(this.VmsListChanged)
    },

    componentWillUnmount: function() {
        Vms.unsubscribe(this.VmsListChanged)
    },

    render: function() {

        var menuItems = [
          { route: 'get-started', text: 'Dashboard', icon: 'action-dashboard'},
          { route: 'get-started', text: 'Machines', icon: 'hardware-desktop-windows', number: "13"},
          { route: 'css-framework', text: 'Datasets', icon: 'image-blur-linear'},
          { route: 'components', text: 'Nodes', icon: 'device-storage'},
          { route: 'exit', text: 'Log out', icon: 'action-label-outline' }
        ];

        rightMenuItems = [
          { payload: '1', text: 'Hello' },
          { payload: '2', text: 'There' }
        ];

        var title = 'Home'

        return (
            <AppCanvas predefinedLayout={1}>

                <AppBar title={title} onMenuIconButtonTouchTap={this.menuToggle}>
                    <mui.DropDownIcon comentario='estos son contextuales...' icon="navigation-more-vert" menuItems={rightMenuItems} />
                    <mui.IconButton icon="action-search" tooltip='Search' />
                </AppBar>

                <mui.LeftNav className='sidebar-menu' ref="sidebar" header={<SidebarHeader/>} menuItems={menuItems} selectedIndex={0} docked={false} isInitiallyOpen={false} onChange={this.menuSelected} />
                <mui.FloatingActionButton className='create-vm-button' icon="content-add" mini={true} />

                <List items={this.state.listItems}/>

                <LoginDialog />

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
    },


    iconsOfVM: function(vm) {

        var icons = []

        if (vm.metadata && vm.metadata.jingles && vm.metadata.jingles.notes)
            icons.push({icon: 'communication-email', alt: 'Has notes'})
        if (Object.keys(vm.backups).length) {
            icons.push({icon: 'action-backup', alt: 'Has backups'})
        }
        if (vm.snapshots && Object.keys(vm.snapshots).length) //TODO: En verdad los backups tambien se meten aqui.. tendria que sacarlos.. :P
            icons.push({icon: 'image-photo-camera', alt: 'Has snapshots'})

        if (vm.config.networks && vm.config.networks.length > 1)
            icons.push({icon: 'social-public', alt: 'Has public IP'})

        //If the history of the VM was changed < 2 days, show it as 'active'
        var recent = 1* 24 * 3600,
            lastLog = vm.log[vm.log.length-1]
        if (Date.now() - lastLog.date/1000 < recent * 1000)
            icons.push({icon: 'action-history', alt: 'Has recent history activity'})

        return icons
    }
})

