var D = require('../dispatcher')

module.exports = {

    setList: function(list) {
        D.handleViewAction({
            actionType: 'VMS_LIST',
            list: list
        })
    }

}