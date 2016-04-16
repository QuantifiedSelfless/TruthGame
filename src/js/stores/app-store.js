'use strict';

var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppActions = require('../actions/app-actions.js');
var lodash = require('lodash');

var one_player_game = true;
var count = 0;
var false_statements = [false, 'You have used \"Your\" incorrectly on social media 74% of the time', 'You have 18 pending facebook messages you never responded to', 'You are friends with your mother on facebook', 'a', 'b']
//'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
//replace with database call
var player1_statements = [true, 'You have 759 friends on facebook', 'You\'ve said pasta 57 times in the last 3 years', 'You are more active on twitter after 9 pm', 'You\'ve commented \"Happy Birthday\" to 278 people since you started your first social media account', 'a']
//'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']; 

var player_1;
var player_2;
var player1_questions;
var player2_questions;

class questions {

    constructor(t_statements, f_statements, one_player_game=false) {
        this.true = create_object(t_statements);
        this.false = create_object(f_statements);
        this.total = this.true.concat(this.false);
        this.one_player_game = one_player_game;
        this.buttonList = [];
    }

    create_button_list() {
        this.total = lodash.shuffle(this.total); 
        if (this.one_player_game) return this.total
        for (var i = 0; i<5; i++) {
            this.buttonList.push(this.total[i]);
        }
        this.total = lodash.slice(this.total, 5);
        this.length = this.buttonList.length;
        return this.buttonList;
    }

    clearButtons() {
        this.buttonList = [];
    }
}

var false_statements = [false, 'You have used \"Your\" incorrectly on social media 74% of the time', 'You have 18 pending facebook messages you never responded to', 'You are friends with your mother on facebook', 'a', 'b']
//'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
//replace with database call
var player1_statements = [true, 'You have 759 friends on facebook', 'You\'ve said pasta 57 times in the last 3 years', 'You are more active on twitter after 9 pm', 'You\'ve commented \"Happy Birthday\" to 278 people since you started your first social media account', 'a']
//'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']; 

var player2_statements = player1_statements;

var player1_questions = new questions(player1_statements, false_statements);
var player2_questions = new questions(player2_statements, false_statements);

>>>>>>> 414c0ea098c3fa0cb60b2811ca34f4e6e158327c
//player object
class player {

    constructor(id, active, one_player_game=false) {
        this.id = 'player' + id;
        this.active = active;
        this.score = 0;
        this.one_player_game = one_player_game;
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
    onePlayer() {
        return this.one_player_game;
    }
}

function create_object(arr) {
    var temp = [];
    for (var i = 1; i<arr.length; i++) {
        temp.push({
            'id': i,
            'title': arr[i],
            'answer': arr[0]
        });
    }
    return temp;
}

function activeQuestions() {
    var questions = player_1.isActive() ? player1_questions : player2_questions;
    return questions;
}
   
function activePlayer() {
    var player = player_1.isActive() ? player_1 : player_2;
    return player;
} 

function startGame(one_player_game) {
    var player2_statements = player1_statements;
    if (one_player_game) {
        player_1 = new player(1, true, one_player_game);
        player1_questions = new questions(player1_statements, false_statements, one_player_game); 
    }

    else {
        player_1 = new player(1, true);
        player_2 = new player(2, false);
        player1_questions = new questions(player1_statements, false_statements);
        player2_questions = new questions(player2_statements, false_statements);
    }
}

startGame(one_player_game);

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
        return player_2.isActive();
    },

    getGameWinner: function(gameType) {
        var temp;
        if (!gameType) {
            if (player_1.score == player_2.score) {temp = 'Both Players tied!';}
            else  {temp = (player_1.score > player_2.score) ? 'Player 1 was victorious' : 'Player 2 was victorious';}
        }
        else temp = "Player 1 was victorious";
        return temp;
    },

    makeQuestionList: function() {
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

    getGameType: function(gameType, currCount, gameCount, finalState=false) {
        var temp = (currCount == gameCount);
        if (gameType && temp) {
            AppStore.emitChange('final_state');
            return;
        }
        if (!gameType && temp) { 
            if (final_state) {
                AppStore.emitChange('final_state');
                return;
            }
            count = 0;
            AppStore.emitChange('switch_to_flipscreen');
            return;
        }
        AppStore.emitChange('update_question');
        count++;
        return; 
    }, 

    gameType: function() {
        return one_player_game;
    },
    getFinalState: function() {
        return (player_2.isActive() && (player_questions.total.length == 0))
    },
    //event dispatcher
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        var player = activePlayer();
        var player_questions = activeQuestions();
        var player_id = player_1.isActive() ? 1 : 2;
        switch(action.actionType) {
            case "CHANGE_SCORE":
                if (payload.action.item.answer) {
                    player.addScore();
                    AppStore.emitChange('score_update' + player_id);
                }
                AppStore.emitChange('show_answer');
                break;

            case "SWITCH_TO_FLIPSCREEN":
                player_questions.clearButtons();
                AppStore.emitChange('switch_to_flipscreen');
                break;

            case "SWITCH_FROM_FLIPSCREEN":
                AppStore.emitChange('switch_from_flipscreen');
                break;

            case "HIDE_ANSWER": 
                if (one_player_game) AppStore.getGameType(true, count, 9);
                else AppStore.getGameType(false, count, 4, finalState=final_state());
                break; 

            case "OUT_OF_QUESTIONS":
                AppStore.emitChange('out_of_questions');
                break;         

        return true; 
        }
    })
})

module.exports = AppStore;

