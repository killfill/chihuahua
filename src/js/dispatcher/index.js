var Dispatcher = require('flux').Dispatcher,
    assign = require('object-assign')

//Maybe just use the raw dispacher instead of this wrapper?
module.exports = assign(new Dispatcher(), {
 handle: function(action) {
     this.dispatch({
         source: 'VIEW_ACTION',
         action: action
     })
 }
})