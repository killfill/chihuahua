var D = require('../dispatcher')

module.exports = {

    setList: function(list) {
        D.handleViewAction({
            actionType: 'ORGS_LIST',
            list: list
        })
    }

}