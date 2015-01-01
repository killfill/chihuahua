var FiFo = require('nfifo/fifo')

module.exports = {
    titelize: function(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    },

    connectToFiFo: function(endpoint) {

        fifo = new FiFo(endpoint)
        fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
        fifo.defaultParams.json = false
        // timeout - Integer containing the number of milliseconds to wait for a request to respond before aborting the request. Note that increasing the timeout beyond the OS-wide TCP connection timeout will not work (the default in Linux is around 20 seconds).
    }

}
