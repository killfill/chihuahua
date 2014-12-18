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


            Session.set('state', {
                isPending: false,
                isLogged: res? res.statusCode === 200: false,
                error: err && err.message,
                data: body || {}
            })
            Session.emit()

            //WARNING: I had to avoid this because of  https://github.com/facebook/flux/issues/106
            //So lets bypass this for now, setting the data in the store directly :(

            // D.handleServerAction({
            //     actionType: 'SESSION_LOGIN_RES',
            //     success: res? res.statusCode === 200: false,
            //     error: err? err.message: null,
            //     data: body || {}
            // })

        })

        
    }
}