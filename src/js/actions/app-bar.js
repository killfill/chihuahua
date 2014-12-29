var D = require('../dispatcher')

module.exports = {
    
    trigger: function(actionName, param) {

    	return function() {
	        D.handleViewAction({
	            actionType: 'APP_BAR',
	            actionName: actionName,
	            param: param
	        })
	
    	}
    }
}