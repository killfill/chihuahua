var React = require('react'),
    Autenticated = require('../mixins/auth')


module.exports = React.createClass({

    mixins: [Autenticated],

    render: function() {
        return <div>DASH</div>
    }
})