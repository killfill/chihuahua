var React = require('react'),
    Router = require('react-router'),
    Dialog = require('material-ui').Dialog,
    Vms = require('../stores/vms'),
    titelize = require('../utils/helpers').titelize

module.exports = React.createClass({

    mixins: [Router.State, Router.Navigation],

    render: function() {
        var uuid = this.getParams().uuid,
            vm = Vms.get(uuid)

        if (!vm)
            return null
        var title = vm
            ? this.buildTitle(vm)
            : uuid

        var body = vm
            ? this.buildBody(vm)
            : 'Unknown VM'

        return (
            <Dialog title={title} openImmediately={true} onDismiss={this.goBack}>
                {body}
            </Dialog>)
    },

    buildTitle: function(vm) {
        return <span><b>{titelize(vm.config.alias)}</b> is {vm.state}</span>
    },

    buildBody: function(vm) {

        if (!vm)
            return 

        return (<div><p>Cosas interesantes</p>
            <ul>
                <li>Stop/Start/Lock/Delete/Reboot</li>
                <li>Performance</li>
                <li>Created</li>
                <li>Type</li>
                <li>Owner</li>
                <li>Color</li>
                <li>Description</li>
                <li>hostname</li>
                <li>DNS</li>
                <li>Dataset</li>
                <li>IPs (netmask, etc)</li>
                <li>Package: CPU/Mem/Disk/IO Prio</li>
                <li>History</li>
                <li>Notes</li>
                <li>(Hypervisor)</li>
                <li>(Services)</li>
                <li>(Snapshots)</li>
                <li>(Backups)</li>
        </ul></div>)
    }
})