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
            actionType: "SWITCH_TO_FLIPSCREEN",
        })
    },

    flipFromScreen: function() {
        AppDispatcher.handleViewAction({
            actionType: "SWITCH_FROM_FLIPSCREEN",
        })
    },

}

module.exports = AppActions;
