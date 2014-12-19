var React = require('react'),
	Router = require('react-router'),
	Actions = require('../actions')
    Autenticated = require('../mixins/auth'),


module.exports = React.createClass({

    mixins: [Autenticated, Router.Navigation],

	componentDidMount: function() {
		Actions.session.logout()
		this.transitionTo('login')
	},

	render: function() {
		return <div>Loggin out...</div>
	}

})