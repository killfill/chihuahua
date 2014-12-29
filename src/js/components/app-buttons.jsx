var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    Actions = require('../actions')

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
        <IconButton key={0} icon='file-cloud' onTouchTap={Actions.appBar.trigger('about')} />
    ],

    machines: [
        <DropDownIcon key={1} icon='navigation-more-vert' menuItems={menuItems['machines']} onChange={this.dropDownTap} />,
        <IconButton key={2} icon='action-search' tooltip='Search' />
    ],

    machine: [
        <DropDownIcon key={1} icon='navigation-more-vert' menuItems={menuItems['machine']} onChange={this.dropDownTap} />,
        <IconButton key={3} icon='av-play-arrow' tooltip='Start' />,
        <IconButton key={4} icon='av-stop' tooltip='Stop' />,
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