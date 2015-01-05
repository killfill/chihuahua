function merge(a,b) {
    for (k in b) {
        a[k] = b[k]
    }
    return a
}

var Store = function (opts) {

    /* Remote stuff: TODO: make this a mixin of Store... */
    opts = opts || {}
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
    }

    this.requestAll = function(headers) {

        var h = merge(headers || {}, this.defaultHeaders)

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

    /* End remote stuff */

    this.data = {}
    this.listeners = []

    this.set = function(id, obj) {
        this.data[id] = obj
        // this.emit()
        return obj
    },

    this.get = function(id) {
        return this.data[id]
    },

    this.update = function(id, newParams) {
        merge(this.data[id], newParams)
        // this.emit()
    }

    this.remove = function(id) {
        delete this.data[id]
        // this.emit()
    }

    this.getAll = function() {
        var data = this.data
        return Object.keys(data).map(function(k) {return data[k]}).sort(this.sortBy)
    }

    this.clear = function() {
        this.data = {}
    }

    this.setData = function(data) {
        if (typeof data !== 'object' || Array.isArray(data))
            throw new Error('Data must by a hash, and is of type ' + typeof data + '! --> ' + this.resource)

        this.data = data
        // this.emit()
    },

    this.setDataArray = function(data, id) {
        if (typeof data !== 'object' || !Array.isArray(data))
            throw new Error('Data must by an array, and is of type ' + typeof data + '! --> ' + this.resource)

        id = id || 'id'

        data.forEach(function(obj) {
            this.data[obj[id]] = obj
        }.bind(this))

        // this.emit()
    },


    //Event
    this.subscribe = function(cb) {
        this.listeners.push(cb)
    },

    //Event
    this.unsubscribe = function(cb) {
        this.listeners.splice(this.listeners.indexOf(cb), 1);
    },

    //Event
    this.emit = function() {
        var data = this.getAll()
        this.listeners.forEach(function(cb) {cb(data)})
    },

    //Overrides
    this.sortBy = function(a, b) {
        return -1
    }

}

module.exports = Store