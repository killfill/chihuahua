var D = require('../dispatcher')

module.exports = {
    
    trigger: function(context, actionName, id) {

        return function(e, selectedIdx, item) {

            switch (context) {
                case 'machine':
                    handleMachine(actionName, id, item)
                    break;

                default:
                    console.info('unhandled app-bar action', context, actionName, id, item)
            }

            D.handleViewAction({
                actionType: 'APP_BAR',
                context: context,
                actionName: actionName,
                id: id,
                params: item
            })

        }
    }
}

function handleMachine(actionName, id, item) {

    var action = actionName === 'menu' ? item.payload : actionName

    switch (action) {
        case 'start':
        case 'stop':
        case 'reboot':
            fifo.send('vms/' + id).put({body: {action: action}}, function(err, res, body) {
                console.log('---->', err, res.statusCode, body)
            })
            break;

        default:
            console.info('Unhandled VM action', actionName, id, item)
    }
}