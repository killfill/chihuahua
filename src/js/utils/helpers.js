var FiFo = require('nfifo/fifo')

module.exports = {
    titelize: function(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    },

    connectToFiFo: function(endpoint) {

        fifo = new FiFo(endpoint)
        fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
        fifo.defaultParams.json = false
    }

}
