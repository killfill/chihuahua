var FiFo = require('nfifo/fifo'),
    D = require('../dispatcher'),
    Datasets = require('./datasets'),
    Vms = require('./vms'),
    Orgs = require('./orgs'),
    Packages = require('./packages'),

    Session = require('../stores/session')

module.exports = {
    login: function(endpoint, login, password) {

        fifo = new FiFo(endpoint, login, password)
        fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
        fifo.defaultParams.json = false


        D.handleViewAction({
            actionType: 'SESSION_LOGIN_REQ'
        })

        fifo.login(login, password, function(err, res, body) {

            D.handleServerAction({
                actionType: 'SESSION_LOGIN_RES',
                success: res? res.statusCode === 200: false,
                error: err? err.message: null,
                data: body || {}
            })

        })

        
    }
}