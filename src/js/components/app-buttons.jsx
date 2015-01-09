var React = require('react'),
    Router = require('react-router'),
    Vm = require('../stores/vm'),
    mui = require('material-ui'),
    triggerAction = require('../actions').appBar.trigger,

    DropDownIcon = mui.DropDownIcon,
    IconButton = mui.IconButton


var menuItems = {
    machines: [
        { payload: '1', text: 'By Name'},
        { payload: '2', text: 'By Created time'},
        { payload: '2', text: 'By IP'},
        { payload: '2', text: 'By Ram'}
    ],

    machine: [
        { payload: 'reboot', text: 'Reboot', disabled: true},
        { payload: 'delete', text: 'Delete'},
        { payload: 'lock', text: 'Lock'},
        { payload: 'snapshot', text: 'Take snapshot'},
        { payload: 'backup', text: 'Take backup'},
    ]
}

var buttons = {
    dashboard: [
        <IconButton key={0} icon='file-cloud' onTouchTap={triggerAction('dashboard', 'about')} />
    ],
    machines: [
        <DropDownIcon key={1} icon='navigation-more-vert' menuItems={menuItems['machines']} onChange={triggerAction('machines', 'menu')} />,
        <IconButton key={2} icon='action-search' onTouchTap={triggerAction('machines', 'search')} />
    ],
    datasets: []
}


var MachineButtons = React.createClass({
    getInitialState: function() {
        return {vm: Vm.get('vm')}
    },
    componentDidMount: function() {
        Vm.subscribe(this.storeChanged)
    },
    componentWillUnmount: function() {
        Vm.unsubscribe(this.storeChanged)
    },
    storeChanged: function() {
        this.setState({vm: Vm.get('vm')})
    },
    render: function() {

        var play = false,
            stop = false,
            uuid,
            alias

        var vm = this.state.vm
        if (vm) {
            play = vm.state !== 'running'
            stop = !play
            uuid = vm.uuid
            alias = vm.config.alias
        }

        var isRunning = false
        return (<span>
            <DropDownIcon key={10} icon='navigation-more-vert' menuItems={menuItems['machine']} onChange={triggerAction('machine', 'menu', uuid, alias)} />
            <IconButton key={3} icon='av-play-arrow' disabled={!play} onTouchTap={triggerAction('machine', 'start', uuid, alias)} />
            <IconButton key={4} icon='av-stop' disabled={!stop} onTouchTap={triggerAction('machine', 'stop', uuid, alias)} />
        </span>)
    }
})

module.exports = React.createClass({

    mixins: [Router.State],

    render: function() {

        var routeName = this.getRoutes()[this.getRoutes().length-1].name

        if (routeName === 'machine')
            return <MachineButtons/>

        return  (<span>{buttons[routeName]}</span>)
    }

})