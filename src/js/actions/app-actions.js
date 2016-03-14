var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {

    changeScore: function(item) {
        AppDispatcher.handleViewAction({
            actionType: "CHANGE_SCORE",
            item: item
        })
    },

    flipToScreen: function() {
        AppDispatcher.handleViewAction({
            actionType: "FLIP_TO_SCREEN",
        })
    },

    flipFromScreen: function() {
        AppDispatcher.handleViewAction({
            actionType: "FLIP_FROM_SCREEN",
        })
    },

}

module.exports = AppActions;
