var React = require('react'),
    md5 = require('md5')

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            email: '',
            defaultSrc: 'erg.png',
            size: 80
        }
    },

    render: function() {

        var src = this.props.defaultSrc
        if (this.props.email && this.props.email.indexOf('@') > -1)
            src = 'https://secure.gravatar.com/avatar/' + md5.digest_s(this.props.email) + '.jpg?d=mm&s=' + this.props.size

        return (<img className='gravatar' src={src} alt={this.props.email} />
        )
    },
})
