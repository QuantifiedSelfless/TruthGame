'use strict';

var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var lodash = require('lodash');

class questions {

    constructor(datablob, answer) {
        this.total = datablob;
        this.answer = answer;
        this.buttonList = [];
    }
 
    create_button_list() {
        this.total = lodash.shuffle(this.total); 
        for (var i = 0; i<5; i++) {
            this.buttonList.push({
                'id': i + 1,
                'title': this.total[i],
                'answer': this.answer
            });
        }
        this.total = lodash.slice(this.total, 5);
        return this.buttonList;
    }

    clearButtons() {
        this.buttonList = [];
    }
}

     
var false_statements = ['You have used \"Your\" incorrectly on social media 74% of the time', 'You have 18 pending facebook messages you never responded to', 'You are friends with your mother on facebook', 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];

//replace with database call
var player1_statements = ['You have 759 friends on facebook', 'You\'ve said pasta 57 times in the last 3 years', 'You are more active on twitter after 9 pm', 'You\'ve commented \"Happy Birthday\" to 278 people since you started your first social media account', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']; 

var player2_statements = player1_statements;

var app_questions = new questions(false_statements, false);
var player1_questions = new questions(player1_statements, true);
var player2_questions = new questions(player2_statements, true);

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

var player_1 = new player(1, true);
var player_2 = new player(2, false);

function activeQuestions() {
    var questions = player_1.isActive() ? player1_questions : player2_questions;
    return questions;
}
   
function activePlayer() {
    var player = player_1.isActive() ? player_1 : player_2;
    return player;
}
var count = 0;
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
    currentPlayer: function() {
        return !player_1.isActive() ? 1 : 0;
    },
    switchPlayer: function() {
        player_1.flipActive();
        player_2.flipActive();
        return player_1.isActive();
    },
    makeFalseList: function() {
        return app_questions.create_button_list();
    },

    makeTrueList: function() {
        return activeQuestions().create_button_list();
    },
    addPlayerScore: function() {
        activePlayer().addScore();
    }, 
    getScore1: function() {
        return player_1.score;
    },
    getScore2: function() {
        return player_2.score;
    },
    //event dispatcher
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        var player = activePlayer();
        var player_id = player_1.isActive() ? 1 : 2;
        switch(action.actionType) {
            case "CHANGE_SCORE":
                if (payload.action.item.answer) {
                    player.addScore();
                    if (player.score == 7) {
                        AppStore.emitChange('finalstate');
                        break;
                    }
                    AppStore.emitChange('score_update' + player_id);
                }
                AppStore.emitChange('show_answer');
                break;

            case "SWITCH_TO_FLIPSCREEN":
                activeQuestions().clearButtons();
                AppStore.emitChange('switch_to_flipscreen');
                break;

            case "SWITCH_FROM_FLIPSCREEN":
                AppStore.emitChange('switch_from_flipscreen');
                break;

            case "HIDE_ANSWER":
                if (count == 4) {
                    count = 0;
                    AppStore.emitChange('switch_to_flipscreen');
                    break; 
                }
                AppStore.emitChange('update_question');
                count++;
                break;
         
        return true; 
        }
    })
})

module.exports = AppStore;

