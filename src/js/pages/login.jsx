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
            endpointErr: null,
            userErr: null,

            isPending: false,
            errorMsg: false,
            endpoint: Session.get('endpoint')
        }
    },

    componentDidMount: function() {

        if (!this.state.endpoint)
            this.refs.endpoint.focus()
        else {
            this.refs.endpoint.setValue(this.state.endpoint)
            this.refs.user.focus()
        }

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
                    <mui.Input error={this.state.endpointErr} ref='endpoint' name='endpoint' inputStyle='floating' placeholder='Endpoint' description='The FiFo backend hostname or IP' />
                    <mui.Input error={this.state.userErr} ref='user' name='user' inputStyle='floating' placeholder='Username' />
                    <mui.Input ref='pass' name='password' inputStyle='floating' placeholder='Password' type='password' />
                    <mui.RaisedButton label="Login" onClick={this.handleLogin} disabled={this.state.isPending} />
                </div>
            </div>
        )
    },

    storeChanged: function(list) {

        var res = Session.get('current')
        if (res.isLogged)
            return this.transitionTo('root')

        this.setState({
            isPending: res.isPending,
            errorMsg: res.error,
            endpoint: Session.get('endpoint')
        })
    },

    handleLogin: function(e) {

        //TODO: is there a fancier way to do this? what happend when pressing enter?
        var d = {
            endpoint: this.refs.endpoint.getValue(),
            user:    this.refs.user.getValue(),
            pass:    this.refs.pass.getValue()
        }

        var errors = {
            endpoint: !d.endpoint? 'Must enter valid endpoint': null,
            user:    !d.user?      'Enter a user name'        : null,
            pass:    !d.pass?      'Enter your password'      : null
        }

        this.setState(errors)

        if (!d.endpoint || !d.user || !d.pass)
            return

        Actions.session.login(d.endpoint, d.user, d.pass)

    }
})