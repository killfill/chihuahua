var Store = require('../utils/store'),
    D = require('../dispatcher')

var Noti = module.exports = new Store()
var list = Noti.set('list', []),
    longText = {
        stop: 'Stopping',
        start: 'Starting',
        restart: 'Restarting'
    }

Noti.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'APP_BAR':

            switch (action.context) {
                case 'machine':

                    var text = longText[action.actionName] + ' machine ' + action.name,
                        pos = list.push({text: text})

                    Noti.emit()

                    // Delete the message after 2s
                    if (pos)
                        setTimeout(function() {
                            list.splice(pos-1, 1)
                            Noti.emit()
                        }, 2*2000)

                    break;
            }
            break;

        case 'SESSION_LOGOUT':
            Noti.clear()
            break;

    }

    return false
})