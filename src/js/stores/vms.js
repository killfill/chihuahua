
var Store = require('../utils/Store.js'),
    D = require('../dispatcher'),
    Actions = require('../actions')

var Vms = module.exports = new Store({
    resource: 'vms',
    defaultHeaders: {
        'x-full-list': true,
        'x-full-list-fields': 'uuid,dataset,package,config,owner,metadata,state,grouping,log,backups,snapshots'
    }
})

//Order by last log (history)
Vms.sortBy = function(a, b) {

    //Assume the last log is the newer one.
    //If there is no logs, orge by created_at
    var _a = a.log.length ? a.log[a.log.length-1].date : a.config.created_at
    var _b = b.log.length ? b.log[b.log.length-1].date : b.config.created_at
    return _b - _a
}

Vms.dispatchToken = D.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {

        case 'SESSION_LOGIN_OK':
            Vms.requestAll()
            break;

        case 'SESSION_LOGOUT':
            Vms.clear()
            break;
    }

    return true
})