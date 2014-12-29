var React = require('react'),
    damals = require('damals'),
    Router = require('react-router'),
    Dialog = require('material-ui').Dialog,
    Vms = require('../stores/vms'),
    Packages = require('../stores/packages'),
    Datasets = require('../stores/datasets'),
    Users = require('../stores/users'),
    Orgs = require('../stores/orgs'),
    titelize = require('../utils/helpers').titelize

module.exports = React.createClass({

    mixins: [Router.State, Router.Navigation],

    getInitialState: function() {
        var uuid = this.getParams().uuid,
            vm = Vms.get(uuid)

        return {
            uuid: uuid,
            vm: vm
        }
    },

    //Request additional data
    requestAdditionals: function() {
        if (this.state.vm && this.state.vm.config.owner)
            Users.request(this.state.vm.config.owner)
    },

    componentDidMount: function() {
        Vms.subscribe(this.vmsStoreChanged)
        Users.subscribe(this.usersStoreChanged)
        this.requestAdditionals()
    },

    componentWillUnmount: function() {
        Vms.unsubscribe(this.vmsStoreChanged)
        Users.unsubscribe(this.usersStoreChanged)
    },

    vmsStoreChanged: function() {
        this.setState({vm: Vms.get(this.state.uuid)})
        this.requestAdditionals()
    },

    usersStoreChanged: function() {
        this.setState({owner: Users.get(this.state.vm.config.owner)})
    },

    render: function() {

        var vm = this.state.vm

        if (!vm)
            return null

        var title = vm
            ? this.buildTitle(vm)
            : uuid

        var body = vm
            ? this.buildBody(vm)
            : <span>Unknown VM</span>

        return body
    },

    buildTitle: function(vm) {
        return <span><b>{titelize(vm.config.alias)}</b> is {vm.state}</span>
    },

    buildBody: function(vm) {

        if (!vm)
            return 

        var networks = vm.config.networks.map(function(n, idx) {
            return (<p key={idx}>
                <div>IP {n.ip} / {n.netmask}</div>
                <div>Primary: {n.primary}</div>
                <div>{n.gateway} / {n.nic_tag}</div>
            </p>)
        })

        var ownerView = this.state.owner
                ? <span>Owned by {this.state.owner.name}@{Orgs.get(this.state.vm.owner).name}</span>
                : <span></span>

        var logs = this.state.vm.log && this.state.vm.log.map(function(log, idx) {
            return (<tr key={idx}><td>{damals(log.date/1000)}</td><td>{log.log}</td></tr>)
        })

        var notes = this.state.vm.metadata.jingles.notes && this.state.vm.metadata.jingles.notes.map(function(note, idx) {
            return (<tr key={idx}><td>{damals(Date.parse(note.created_at))}</td><td>{note.text}</td></tr>)
        })

        return (<div>
            <h3>{vm.config.alias}</h3>
            <p>{vm.config.hostname}</p>
            <p>Desc: {vm.metadata.jingles.description}</p>
            {ownerView}
            <p>Icons: </p>
            <p>Created {damals(Date.parse(vm.config.created_at))} ({vm.config.created_at})</p>
            <p>{networks}</p>
            <p>Package: {Packages.get(vm.package) && Packages.get(vm.package).name}</p>
            <p>Dataset: {Datasets.get(vm.dataset) && Datasets.get(vm.dataset).name}</p>
            <p>Color: {this.state.vm.metadata.jingles.color}</p>
            <table>{notes}</table>
            <table>{logs}</table>
            <p>Is locked: {this.state.vm.metadata.jingles.locked && 'YEP' || 'NOPE'}</p>
            <ul>
                <li>(Performance)</li>
                <li>(Services)</li>
                <li>(Snapshots)</li>
                <li>(Backups)</li>
        </ul></div>)
    }
})