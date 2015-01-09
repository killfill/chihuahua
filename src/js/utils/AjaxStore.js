var Store = require('./store'),
    assign = require('object-assign')

//Extended Store that can make requests to the backend
var AjaxStore = module.exports = function(opts) {

    //Inherit from Store.
    Store.apply(this, arguments)

    opts = opts || {}
    this.resource = opts.resource || 'resource options is missing'
    this.defaultHeaders = opts.defaultHeaders || {'x-full-list': true}
    

    this.request = function(uuid, opts) {
        opts = opts || {}

        //Cache!
        if (!opts.force && this.get(uuid))
            return this.emit()

        var h = this.defaultHeaders

        fifo.send(this.resource).get({args: uuid, headers: h}, function(err, res, body) {

            if (err || res.statusCode !== 200 || !body)
                return console.error('Could not query:' + (err && err.message || res.statusCode))

            this.set(uuid, body)
            this.emit()

        }.bind(this))
    },

    this.requestAll = function(headers) {

        var h = assign(headers || {}, this.defaultHeaders)

        fifo.send(this.resource).get({headers: h}, function(err, res, body) {

            if (err || res.statusCode !== 200 || !body)
                return console.error('Could not query:' + (err && err.message || res.statusCode))

            if (Array.isArray(body))
                this.setDataArray(body, 'uuid')
            else
                this.setData(body)
            this.emit()

        }.bind(this))
    }
}
