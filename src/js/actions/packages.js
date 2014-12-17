var D = require('../dispatcher')

module.exports = {

    setList: function(list) {
        D.handleViewAction({
            actionType: 'PACKAGES_LIST',
            list: list
        })
    }

}