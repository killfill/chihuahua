var FiFo = require('nfifo/fifo'),
    Datasets = require('./datasets'),
    Vms = require('./vms'),
    Orgs = require('./orgs'),
    Packages = require('./packages')

module.exports = {
    login: function(endpoint, login, password) {

        fifo = new FiFo(endpoint, login, password)
        fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
        fifo.defaultParams.json = false
        
        fifo.login(login, password, function(err, res, body) {
            if (err || res.statusCode != 200)
                alert(err || res.statusCode)

            //TODO: x-full-list-fields <----
            fifo.send('vms').get({headers: {'x-full-list': true}}, function(err, req, vms) {
                fifo.send('datasets').get({headers: {'x-full-list': true}}, function(err, req, datasets) {
                    fifo.send('orgs').get({headers: {'x-full-list': true}}, function(err, req, orgs) {
                        fifo.send('packages').get({headers: {'x-full-list': true}}, function(err, req, packages) {

                            Packages.setList(packages)
                            Orgs.setList(orgs)
                            Datasets.setList(datasets)
                            Vms.setList(vms)

                        })
                    })
                })
            })

        })

        
    }
}