var FiFo = require('nfifo/fifo')


module.exports = {
    login: function(endpoint, login, password) {

        fifo = new FiFo(endpoint, login, password)
        fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
        fifo.defaultParams.json = false
        
        fifo.login(login, password, function(err, res, body) {
            if (err || res.statusCode != 200)
                alert(err || res.statusCode)

            // alert(res.statusCode)
            // console.log('LOGIN:', body)
            window.onLogin && window.onLogin()

            fifo.send('vms').get({headers: {'x-full-list': true}}, function(err, req, body) {
                require('./index').vms.setList(body)
            })

        })

        
    }
}