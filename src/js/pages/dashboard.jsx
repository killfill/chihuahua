var React = require('react'),
    Autenticated = require('../mixins/auth')


module.exports = React.createClass({

    mixins: [Autenticated],

    render: function() {
        return (<div>
            <div>
                Main status: ok
                Errores: 1, 2, 3, 4, 5 
            </div>
            <p>Welcome xxx</p>
            <p>1 SSH Key</p>
            <p>Organizations: Lala</p>
            <p>Roles: 1, 2, 3</p>
            <p>VMS: 11: 5 stopped.</p>
            <div>
                <p>Memory: 45% 27 de 64GB</p>
                <p>Disk usage: 300 de 333TB</p>
                <p></p>
            </div>
            <div>
                ML / Rss feed
                Twitter feed
                Need help? => ML / IRC
            </div>
        </div>)
    }
})