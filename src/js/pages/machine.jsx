var React = require('react'),
    damals = require('damals'),
    Router = require('react-router'),
    Vm = require('../stores/vm'),
    Packages = require('../stores/packages'),
    Datasets = require('../stores/datasets'),
    Orgs = require('../stores/orgs'),
    titelize = require('../utils/helpers').titelize

module.exports = React.createClass({

    mixins: [Router.State, Router.Navigation],

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
        var vm = this.state.vm
        return vm? this.buildBody(vm): null
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

        var user = Vm.get('user')
        var ownerView = user
                ? <span>Owned by {user.name}@{Orgs.get(vm.owner).name}</span>
                : <span></span>

        var logs = this.state.vm.log && this.state.vm.log.map(function(log, idx) {
            return (<tr key={idx}><td>{damals(log.date/1000)}</td><td>{log.log}</td></tr>)
        })

        var notes = this.state.vm.metadata.jingles.notes && this.state.vm.metadata.jingles.notes.map(function(note, idx) {
            return (<tr key={idx}><td>{damals(Date.parse(note.created_at))}</td><td>{note.text}</td></tr>)
        })

        return (<div>
            <h3>{vm.config.alias}</h3>
            <h4>{vm.state}</h4>
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