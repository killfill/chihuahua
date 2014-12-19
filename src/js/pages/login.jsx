var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    Actions = require('../actions'),

    Session = require('../stores/session'),

    Vms = require('../stores/vms'),
    Packages = require('../stores/packages'),
    Orgs = require('../stores/orgs'),
    Datasets = require('../stores/datasets')

module.exports = React.createClass({

    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
            backend: null,
            user: null,
            pass: null,

            isPending: false,
            errorMsg: false
        }
    },

    componentDidMount: function() {
        this.refs.user.focus()
        this.refs.backend.setValue('https://nube.virtualizado.cl')

        Session.subscribe(this.storeChanged)
    },

    componentWillUnmount: function() {
        Session.unsubscribe(this.storeChanged)
    },

    render: function() {

        var message = this.state.errorMsg
            ? <span style={{color:'red'}}>{this.state.errorMsg}</span>
            : <span>Please enter your credentials</span>

        return (
            <div className='login-page'>
                <div className='login-content'>
                    <div className='welcome'>
                        <h2>Welcome</h2>
                        <h4>{this.state.isPending? 'Please wait...': message}</h4>
                    </div>
                    <mui.Input error={this.state.backend} ref='backend' name='backend' inputStyle='floating' placeholder='Backend' description='The FiFo backend hostname or IP' />
                    <mui.Input error={this.state.user} ref='user' name='user' inputStyle='floating' placeholder='Username' />
                    <mui.Input error={this.state.pass} ref='pass' name='password' inputStyle='floating' placeholder='Password' type='password' />
                    <mui.RaisedButton label="Login" onClick={this.handleLogin} disabled={this.state.isPending} />
                </div>
            </div>
        )
    },

    storeChanged: function(list) {

        var res = Session.get('state')
        if (res.isLogged)
            return this.transitionTo('root')

        this.state.isPending = res.isPending
        this.state.errorMsg = res.error
        this.setState(this.state)
    },

    handleLogin: function(e) {

        //TODO: is there a fancier way to do this? what happend when pressing enter?
        var d = {
            backend: this.refs.backend.getValue(),
            user:    this.refs.user.getValue(),
            pass:    this.refs.pass.getValue()
        }

        var errors = {
            backend: !d.backend? 'Must enter valid endpoint': null,
            user:    !d.user?    'Enter a user name'               : null,
            pass:    !d.pass?    'Enter your password'      : null
        }

        this.setState(errors)

        if (!d.backend || !d.user || !d.pass)
            return

        Actions.session.login(d.backend, d.user, d.pass)

        e && e.stopPropagation()

    }

})