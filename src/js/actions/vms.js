var D = require('../dispatcher')

module.exports = {

    requestList: function() {

        D.handleViewAction({
            actionType: 'VMS_LIST_REQ'
        })

        fifo.send('vms').get({headers: {'x-full-list': true}}, function(err, res, body) {

            D.handleServerAction({
                actionType: 'VMS_LIST_RES',
                list: body,
                succeed: res.statusCode === 200
            })
        })

    }

}