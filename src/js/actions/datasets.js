var D = require('../dispatcher')

module.exports = {

    requestList: function() {

        D.handleViewAction({
            actionType: 'DATASETS_LIST_REQ'
        })

        fifo.send('datasets').get({headers: {'x-full-list': true}}, function(err, res, body) {

            D.handleServerAction({
                actionType: 'DATASETS_LIST_RES',
                list: body,
                succeed: res.statusCode === 200
            })
        })

    }

}