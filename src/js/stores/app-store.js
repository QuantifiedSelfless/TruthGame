'use strict';
var React = require('react');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('event').EventEmitter;

var datablob = {
    false_statements: ['You have used \"Your\" incorrectly on social media 74% of the time', 'You have 18 pending facebook messages you never responded to', 'You are friends with your mother on facebook', ''];
    //replace with database call
    true_statements: ['You have 759 friends on facebook', 'You\'ve said pasta 57 times in the last 3 years', 'You are more active on twitter after 9 pm''You\'ve commented \"Happy Birthday\" to 278 people since you started your first social media account']; 
}

//list objects for dispatcher data
falseList = []
trueList = []

for (var i=0; i<(datablob.false_statements.length); i++) {
    trueList.push({
        'id': i + 1,
        'title': datablob.true_statements[i],
        'answer': true
    });
    falseList.push({
        'id': i + 1,
        'title': datablob.false_statements[i],
        'answer': false
    });
}

//player object
class player {
    constructor(id, active) {
        this.id = 'player' + id;
        this.active = active;
        this.score = 0;
    }
    isActive() {
        return this.active;
    }
    flipActive() {
        this.active = !this.active;
    }
    addScore() {
        this.score++;
    }
}

var Player_1 = new player(1, true);
var Player_2 = new player(2, false);

function activePlayer() {
    var player = Player_1.isActive() ? Player_1 : Player_2;
    return player;
}

//appstore event emitter
var AppStore = assign(EventEmitter.prototype, {
    emitChange: function(change) {
        this.emit(change);
    },
    addChangeListener: function(change, callback) {
        this.on(change, callback);
    },
    removeChangeListener: function(change, callback) {
        this.removeListener(change, callback);
    },

    //game specific functions
    getFalseList: function() {
        return falseList;
    },
    getTrueList: function() {
        return trueList;
    },
    addPlayerScore: function() {
        activePlayer().addScore();
    }, 
    //event dispatcher
    getScore1: function() {
        return Player_1.score;
    },
    getScore2: function() {
        return Player_2.score;
    },
    //event dispatcher
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        var player = activePlayer();
        switch(action.actionType) {
            case "SCORE": 
                if (payload.action.answer) {
                    player.addPlayerScore(); 
                    AppStore.emitChange('increase_score');
                }
            break;
        return true; 
        }
    })
})

module.exports = AppStore;

