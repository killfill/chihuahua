var PING_INTERVAL = 5000

module.exports = function(opts) {
    this.ws = null
    this.token = null

    this.pinger = null
    this.lastPong = null

    //Events
    this.onMsg = opts.onMsg || function(){}
    this.onLogin = opts.onLogin || function(){}
    this.onDisconnect = opts.onDisconnect || function(){}

    this.connect = function(url, token) {

        this.token = token
        this.ws = new WebSocket(url, 'json')

        //Connection established
        this.ws.onopen = function() {
            this.lastPong = Date.now()
            this.send({token: token})
        }.bind(this)

        //Could not connect
        this.ws.onerror = function() {
            console.error('Howl: there was an error :(')
        }

        this.ws.onclose = function(evt) {
            this._disconnect()

            //Try to reconnect if we have a token
            if (this.token) {
                console.info('Howl: onclose. Will try to reconnect in 5 secs...')
                setTimeout(this.connect.bind(this, url, this.token), 5 * 1000)
            }

        }.bind(this)

        this.ws.onmessage = function(e) {

            var msg = JSON.parse(e.data)

            //After we are autenticated, start to ping and trigger onLogin
            if (msg.ok == 'authenticated') {
                this.pinger = setInterval(function(){this.send({ping: 1})}.bind(this), PING_INTERVAL)
                return this.onLogin()
            }

            if (msg.pong === 1)
                return this.lastPong = Date.now()

            this.onMsg(msg)

        }.bind(this)
    },

    this._disconnect = function() {

        //Stop pinging if we are not connected...
        if (this.pinger)
            clearInterval(this.pinger)

        if (this.ws)
            this.ws.close()

        this.onDisconnect()
    }

    //Explicit disconnect by the user
    this.disconnect = function() {
        this.token = null
        this._disconnect()
    },

    this.send = function(json) {
        if (!this.ws)
            throw new Error('Cannot send when disconnected')
        this.ws.send(JSON.stringify(json))
    }
}
