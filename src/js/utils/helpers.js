var FiFo = require('nfifo/fifo')

module.exports = {
    titelize: function(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    },

    connectToFiFo: function(endpoint) {

        fifo = new FiFo(endpoint)
        fifo.defaultParams.tmeout = 5000

        //If on browser, assume we need the headers hack
        var url = document.URL
        isBrowser = url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0
        if (isBrowser) {
            fifo.defaultParams.headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
            fifo.defaultParams.json = false
        }

    },

    //Merge b into a
    merge: function(a, b) {
        for (k in b) {
            a[k] = b[k]
        }
        return a
    }

}
