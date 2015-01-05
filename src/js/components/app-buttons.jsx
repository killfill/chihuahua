var React = require('react'),
    Router = require('react-router'),
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
        { payload: '2', text: 'Reboot'},
        { payload: '2', text: 'Delete'},
        { payload: '2', text: 'Lock'},
        { payload: '2', text: 'Take snapshot'},
        { payload: '2', text: 'Take backup'},
    ]
}


var routeButtonsItems = {

    dashboard: [
        <IconButton key={0} icon='file-cloud' onTouchTap={triggerAction('dashboard', 'about')} />
    ],

    machines: [
        <DropDownIcon key={1} icon='navigation-more-vert' menuItems={menuItems['machines']} onChange={triggerAction('machines', 'menu')} />,
        <IconButton key={2} icon='action-search' onTouchTap={triggerAction('machines', 'search')} />
    ],

    machine: [
        <DropDownIcon key={10} icon='navigation-more-vert' menuItems={menuItems['machine']} onChange={triggerAction('machine', 'menu')} />,
        <IconButton key={3} icon='av-play-arrow' onTouchTap={triggerAction('machine', 'start')} />,
        <IconButton key={4} icon='av-stop' onTouchTap={triggerAction('machine', 'stop')} />,
    ],

    datasets: []
}


module.exports = React.createClass({

    mixins: [Router.State],

    render: function() {

        var routeName = this.getRoutes()[this.getRoutes().length-1].name,
            items = routeButtonsItems[routeName]

        return  (<span>{items}</span>)
    }

})