var D = require('../dispatcher')

module.exports = {

    //Select VM event
    selected: function(uuid) {
        D.handleViewAction({
            actionType: 'VM_SELECTED',
            uuid: uuid
        })
    }

}