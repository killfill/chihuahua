var D = require('../dispatcher')

module.exports = {

    setList: function(list) {
        D.handleViewAction({
            actionType: 'DATASETS_LIST',
            list: list
        })
    }

}