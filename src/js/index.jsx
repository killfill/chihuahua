var Start = require('./utils/start')

//Be nice and wait until all is loaded.
window.onload = function() {
	Start.app()
}

if (process.env.NODE_ENV !== 'production')
    require('./live-reload')