
var React = require('react'),
    mui = require('material-ui'),
    Actions = require('../actions')

module.exports = React.createClass({

    getInitialState: function() {
        return {
            backend: null,
            user: null,
            pass: null
        }
    },

    componentDidMount: function() {
        this.refs.user.focus()
        this.refs.backend.setValue('https://nube.virtualizado.cl')


        // this.refs.dialog.refs.dialogWindow._handleOverlayTouchTap = function() {
        //     console.log('blblblblock')
        // }
        console.log(this.refs.dialog.refs.dialogWindow)
    },

    render: function() {
        return (<mui.Dialog ref='dialog'
            title='FiFo Mobile UI'
            className='login-dialog'
            openImmediately={true}
            actions={[{text: 'Login', onClick: this.handleLogin}]}>

                Enter your credentials
                <mui.Input error={this.state.backend} ref='backend' name='backend' inputStyle='floating' placeholder='Backend' description='The FiFo backend hostname or IP' />
                <mui.Input error={this.state.user} ref='user' name='user' inputStyle='floating' placeholder='Username' />
                <mui.Input error={this.state.pass} ref='pass' name='password' inputStyle='floating' placeholder='Password' type='password' />
        </mui.Dialog>)
    },

    handleLogin: function() {

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
    }
})
        