var merge = require('./helpers').merge

//Simple raw store
var Store = module.exports = function () {

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
    },

    //Merge other properties into the current instance
    //i.e. for use as the howl store.. :P
    this.mergeWith = function(other) {
        return merge(this, other)
    }

}

window.Store = Store
