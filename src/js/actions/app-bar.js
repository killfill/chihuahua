var D = require('../dispatcher')

module.exports = {
    
    trigger: function(context, actionName) {

        return function(e, selectedIdx, item) {
            console.log('Look', context, actionName, item)
            D.handleViewAction({
                actionType: 'APP_BAR',
                context: context,
                actionName: actionName,
                params: item
            })

        }
    }
}