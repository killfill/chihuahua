var React = require('react'),
    titelize = require('../utils/helpers').titelize,
    List = require('../components/list.jsx'),

    Vms = require('../stores/vms'),
    Datasets = require('../stores/datasets')

module.exports = React.createClass({
    
    getInitialState: function() {
        return {list: Datasets.getAll().map(this.forList)}
    },

    componentDidMount: function() {
        Datasets.subscribe(this.listChanged)
    },

    componentWillUnmount: function() {
        Datasets.unsubscribe(this.listChanged)
    },

    listChanged: function(list) {
        var items = list.map(this.forList)
        this.setState({list: items})
    },

    render: function() {
        return <List items={this.state.list}/>
    },

    forList: function(dataset) {


        var usedIn = Vms.getAll().map(function(vm) {
                        return vm.config.dataset === dataset.uuid
                    }).filter(function(o) {return o}).length,

            usedBy = usedIn? 'Used by ' + usedIn + ' VMs. ' : 'Used by no VMs. '


        var icons = []

        if (usedIn)
            icons.push({icon: 'hardware-desktop-windows', alt: 'In use'})

        if (dataset.metadata.homepage)
            icons.push({icon: 'action-home', alt: 'Has a homepage'})

        if (dataset.requirements.length)
            icons.push({icon: 'communication-clear-all', alt: 'Has requirements'})


        //It looks like when zone, its in bytes. Kvm is in MB
        var MB = dataset.type === 'zone'
            ? Math.round(dataset.image_size/1024/1024)
            : Math.round(dataset.image_size)

        var networks = ''
        if (dataset.networks.length > 1)
            networks = 'Requires ' + dataset.networks.length + ' networks. '

        return {
            image: 'https://nube.virtualizado.cl/images/logos/' + dataset.os + '.png',
            title: titelize(dataset.name) + ' v' + dataset.version,
            date: titelize(dataset.status),
            icons: icons,
            description:
                MB + 'MB. ' +
                usedBy +
                dataset.description +
                networks
        }
    },

})