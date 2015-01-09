var React = require('react'),
    Notifications = require('../stores/notifications')

module.exports = React.createClass({
    getInitialState: function() {
        return {messages: []}
    },
    componentDidMount: function() {
        Notifications.subscribe(this.storeChanged)
    },
    componentWillUnmount: function() {
        Notifications.unsubscribe(this.storeChanged)
    },
    storeChanged: function() {
        this.setState({
            messages: Notifications.get('list')
        })
    },
    render: function() {

        //<Snackbar message="" openOnMount={true} action="Err" />
        var list = this.state.messages.map(function(msg, idx) {
            return <div key={idx}>{msg.text}</div>
        })

        return <span>{list}</span>
    }
})