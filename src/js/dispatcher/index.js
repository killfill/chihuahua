var Dispatcher = require('flux').Dispatcher

var D = new Dispatcher()


D.handleServerAction = function(action) {
    this.dispatch({
        source: 'SERVER_ACTION',
        action: action
    })
}

D.handleViewAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    })
}

module.exports = D