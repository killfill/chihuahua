var React = require('react'),
    Autenticated = require('../mixins/auth'),
    mui = require('material-ui'),

    Vms = require('../stores/vms'),
    Session = require('../stores/session'),
    Orgs = require('../stores/orgs'),
    Roles = require('../stores/roles'),
    Cloud = require('../stores/cloud')


module.exports = React.createClass({

    mixins: [Autenticated],

    componentDidMount: function() {
        Vms.subscribe(this.storeChanged)
        Session.subscribe(this.storeChanged)
        Orgs.subscribe(this.storeChanged)
        Roles.subscribe(this.storeChanged)
        Cloud.subscribe(this.storeChanged)

        //Request for cloud status frequently...
        Cloud.requestAll()
        this.cloudInterval = setInterval(function() {
            Cloud.requestAll()
        }, 10*1000)
    },
    componentWillUnmount: function() {
        Vms.unsubscribe(this.storeChanged)
        Session.unsubscribe(this.storeChanged)
        Orgs.unsubscribe(this.storeChanged)
        Roles.unsubscribe(this.storeChanged)
        Cloud.unsubscribe(this.storeChanged)

        clearInterval(this.cloudInterval)
    },
    storeChanged: function() {
        this.forceUpdate()

        if (Session.get('about')) {
            this.refs.aboutDialog.show()
        }
    },

    render: function() {

        var vms = Vms.getAll(),
            histo = this.vmsHistogram(vms),
            vmsHisto = Object.keys(histo).map(function(k, idx) {
                return <p key={idx}><b>{k}</b><span>{histo[k].count}</span></p>
            })

        var ramUsed = vms.reduce(function(prev, item) {
            return prev + item.config.ram
        }, 0)

        var session = Session.get('current').data
            sshKeys = Object.keys(session.keys).map(function(k, idx) {
                return <p key={idx}>{k}</p>
            }),
            orgs = session.orgs.map(function(org, idx) {
                var o = Orgs.get(org)
                return <span key={idx}>{o && o.name}</span>
            }),
            roles = session.roles.map(function(role, idx) {
                var r = Roles.get(role)
                return <span key={idx}>{r && r.name}</span>
            })

        var problems = Cloud.get('warnings') && Cloud.get('warnings').map(function(w, idx) {
            return (<div key={idx}><h3>Uups, there is a problem with this cloud</h3>
                <p>Category: {w.category}</p>
                <p>Element: {w.element}</p>
                <p>Message: {w.message}</p>
            </div>)
        })

        return (<div>
            {problems}
            <p>Welcome {session.name}</p>
            <div>SSH Keys: {sshKeys}</div>
            <p>Organizations: {orgs}</p>
            <div>VMS: {vmsHisto}</div>
            <p>Roles: {roles}</p>
            <div>Memory Used: {ramUsed}MB</div>
            <mui.Dialog ref='aboutDialog' title='About Chihuahua' onDismiss={this.aboutDismissed}>
                <p>This is a demo!!... :P</p>
                <p>Checkout the <a href='#'>documentation</a></p>
                <p>or the ML, TW or IRC for human help...</p>
            </mui.Dialog>
        </div>)
    },

    vmsHistogram: function(vms) {

        var hist = {}
        vms.forEach(function(vm) {
            if (!hist[vm.state]) hist[vm.state] = {count: 0, state: vm.state}
            hist[vm.state].count++
        })

        return hist
    },

    aboutDismissed: function() {
        Session.set('about', undefined)
    }
})