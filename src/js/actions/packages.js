var D = require('../dispatcher')

module.exports = {

    requestList: function() {

        D.handleViewAction({
            actionType: 'PACKAGES_LIST_REQ'
        })

        fifo.send('packages').get({headers: {'x-full-list': true}}, function(err, res, body) {

            D.handleServerAction({
                actionType: 'PACKAGES_LIST_RES',
                list: body,
                succeed: res.statusCode === 200
            })
        })

    }

}