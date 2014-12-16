var D = require('../dispatcher')

module.exports = {

    setList: function(vms) {
        D.handleViewAction({
            actionType: 'VMS_LIST',
            vms: vms
        })
    }

}