
function merge(a,b) {
	for (k in b) {
		a[k] = b[k]
	}
	return a
}

function Store() {
	this.data = {}
	this.listeners = []

	this.set = function(id, obj) {
		this.data[id] = obj
		// this.emit()
	},

	this.get = function(id) {
		return this.data[id] || this.data[id.id]
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

	this.setData = function(data) {
		if (typeof data !== 'object' || Array.isArray(data))
			throw new Error('Data must by a hash!')

		this.data = data
		// this.emit()
	},

	this.setDataArray = function(data, id) {
		if (typeof data !== 'object' || !Array.isArray(data))
			throw new Error('Data must by an array!')

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
		delete this.listeners[cb]
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