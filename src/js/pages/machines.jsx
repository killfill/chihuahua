var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    damals = require('damals'),
    helpers = require('../utils/helpers'),
    List = require('../components/list.jsx'),
    Autenticated = require('../mixins/auth'),
    Actions = require('../actions'),

    Vms = require('../stores/vms'),
    Datasets = require('../stores/datasets'),
    Orgs = require('../stores/orgs'),
    Packages = require('../stores/packages')

module.exports = React.createClass({

    mixins: [Autenticated, Router.Navigation],

    getInitialState: function() {
        return {list: Vms.getAll().map(this.forList)}
    },

    componentDidMount: function() {
        Vms.subscribe(this.storeChanged)
        Datasets.subscribe(this.storeChanged)
    },

    componentWillUnmount: function() {
        Vms.unsubscribe(this.storeChanged)
        Datasets.unsubscribe(this.storeChanged)
    },

    storeChanged: function() {
        var items = Vms.getAll().map(this.forList)
        this.setState({list: items})
    },

    render: function() {
        return (<div>
            <List items={this.state.list} onTouchTap={this.itemClicked} />
            <RouteHandler/>
        </div>)
    },

    itemClicked: function(item) {
        this.transitionTo('machine', {uuid: item.uuid})
    },

    forList: function(vm) {

        var dataset = {
            name: '',
            os: false
        }

        if (vm.config.dataset) {
            var d = Datasets.get(vm.config.dataset)
            if (d) {
                dataset.name = helpers.titelize(d.name) + ' v' + d.version
                dataset.os = d.os
            }
            else
                dataset.os = 'unknown'
        }

        var createdAt = damals(Date.parse(vm.config.created_at))

        var owner = false
        if (vm.owner) {
            var o = Orgs.get(vm.owner)
            if (o)
                owner = o.name
        }

        var pack = false
        if (vm.config.package) {
            var p = Packages.get(vm.config.package)
            if (p)
                pack = p.name
        }

        var disk = vm.config.quota + 'GB'
        if (vm.config.disks) {
            disk = vm.config.disks.map(function(d) {return Math.round(d.size/1000) + 'GB'}).join('+')
        }

        var vmTitle = helpers.titelize(vm.config.alias)
        if (vm.metadata.jingles && vm.metadata.jingles.color)
            vmTitle = '<span style="color: ' + vm.metadata.jingles.color + '">' + vmTitle + '</span>'

        var ips = vm.config.networks.map(function(net) {
            if (net.primary)
                return net.ip
        }).filter(function(o){return o})
        var ip = ''
        if (ips.length)
            ip = ips[0]

        return {
            uuid: vm.uuid,
            image: dataset.os? 'images/os/' + dataset.os + '.png': false,
            title: vmTitle,
            date: helpers.titelize(vm.state),
            icons: this.iconsOfVM(vm),
            description:
                (dataset.name? (dataset.name + '. '): '') +
                (pack? (helpers.titelize(pack) + ' machine with '): '') +
                (vm.config.ram/1024) + 'GB Ram, ' +
                (vm.config.vcpus || (vm.config.cpu_cap / 100)) + 'vCPU and ' + disk + ' disk. Created ' + createdAt + '. ' +
                (ip? ('IP ' + ip + '. '): '') +
                (owner? ('Owned by ' + owner) + '. ': '')
        }
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
            icons.push({icon: 'social-public', alt: 'Has multiple IPs'})

        //If the history of the VM was changed < 2 days, show it as 'active'
        var recent = 1 * 24 * 3600,
            lastLog = vm.log[vm.log.length-1],
            seconds = lastLog && (Date.now() - lastLog.date/1000)/1000

        if (seconds && seconds < recent)
            icons.push({icon: 'action-history', alt: 'Has recent history activity'})

        if (vm.metadata.jingles && vm.metadata.jingles.locked)
            icons.push({icon: 'action-lock-outline', alt: 'Is locked'})

        return icons
    }
})