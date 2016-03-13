var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {

    addScore: function(item) {
        AppDispatcher.handleViewAction({
            actionType: "SCORE",
            item: item
        })
    },

}

module.exports = AppActions;
