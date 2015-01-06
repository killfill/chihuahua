var D = require('../dispatcher')

module.exports = {
    
    trigger: function(context, actionName, id) {

        return function(e, selectedIdx, item) {
            console.log('app-bar action:', context, actionName, id, item)
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