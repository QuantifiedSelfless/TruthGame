'use strict';

var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppActions = require('../actions/app-actions.js');
var lodash = require('lodash');
var $ = require('jquery');

var one_player_game = true;
var count = 0;
var two_player_count = 0;
var player1_statements;
var player2_statements;
var second_ajax_call = false;
var player_1;
var player_2;
var player1_questions;
var player2_questions;

function create_object(arr, truth) {
    var temp = [];
    for (var i = 0; i<arr.length; i++) {
        temp.push({
            'title': arr[i],
            'answer': truth
        });
    }
    return temp;
}


class questions {

    constructor(t_statements, f_statements, number_of_players) {
        this.true = create_object(t_statements, true);
        this.false = create_object(f_statements, false);
        this.total = this.true.concat(this.false);
        this.one_player_game = number_of_players;
        this.buttonList = [];
    }

    create_button_list() {
        console.log("hello");
        this.total = lodash.shuffle(this.total); 
        if (this.one_player_game) return this.total
        this.buttonList = [];
        for (var i = 0; i<5; i++) {
            this.buttonList.push(this.total[i]);
        }
        this.total = lodash.slice(this.total, 5);
        return this.buttonList;
    }
}

//player object
class player {

    constructor(id, active, number_of_players) {
        this.id = 'player' + id;
        this.active = active;
        this.score = 0;
        this.one_player_game = number_of_players;
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

function startGame(item) {
     
    if (item.length == 2) {
        one_player_game = false;
        player_1 = new player(1, true, false);
        player_2 = new player(2, false, false);
        player1_questions = new questions(item[0]['true'], item[0]['false'], false); 
        player2_questions = new questions(item[1]['true'], item[1]['false'], false);
    }

    else {
        console.log(item[0]['true'], item[0]['false']);
        player_1 = new player(1, true, true);
        player1_questions = new questions(item[0]['true'], item[0]['false'], true);
    }
};

function activeQuestions() {
    var questions = player_1.isActive() ? player1_questions : player2_questions;
    return questions;
};
   
function activePlayer() {
    var player = player_1.isActive() ? player_1 : player_2;
    return player;
};

function gameTied() {
    return (player_1.score == player_2.score)
};

function performance(score, gameWinner) {
    var temp;
    if (score < 33) {
        if (one_player_game) {
            temp = "Your performance shows you are very easy to manipulate. You should reflect on your misdirected beliefs."
            return temp;
        } 
        if (gameTied()) { return temp = "You are both extremely dillusioned. DesignCraft is disappointed." }
        if (!gameWinner) {
            temp = "Your performance shows you are very easy to manipulate. You should reflect on your misdirected beliefs."
        }
        if (gameWinner) {
            temp = "You won entirely by chance, and we expect you to do better in the future."
        }
    }
    if (score > 33 && score < 66) {
        if (one_player_game) {
            temp = "You were somewhat knowledgeable, but there's room for improvement. We'll be in touch."
            return temp
        }
        if (gameTied()) { return temp = "We are unimpressed with both of your average performances." }
        if (!gameWinner) {
            temp = "You were somewhat knowledgeable, but there's room for improvement. We'll be in touch."
        }
        if (gameWinner) {
            temp = "You were somewhat knowledgeable, and you bested your opponent. We'll be in touch."
        }
    }
    if (score > 66) {
        if (one_player_game) {
            temp = "Very impressive. We think you're DesignCraft material." 
            return temp;
        }
        if (gameTied()) { return temp = "An admirable performance from the both of you. We see great things in your future." }
        if (!gameWinner) {
            temp = "We were impressed with your performance. You have potential for great things."
        }
        if (gameWinner) {
            temp = "Very impressive. We think you're DesignCraft material.."
        }
    }
    return temp;
};

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

    getFinalTitle: function() {
        var temp = (player_1.score > player_2.score) ? 'Player 1 won the Truth Game.' : 'Player 2 won the Truth Game.';
        return temp;
    },

    getFinishGame: function() {
        if (one_player_game) { return 'One Player Game'}
        if (player_1.score == player_2.score) { return 'Game Tied'}
        else { return 'Game Winner' }
    }, 

    final_two_player: function() {
        var temp;
        var temp2;
        var message;
        var message2;
        var player1;
        var player2;
        player1 = (player_1.score > player_2.score);
        player2 = (player_2.score > player_1.score);
        temp = (player_1.score/10.0) * 100;
        temp2 = (player_2.score/10.0) * 100; 
        message = performance(temp, player1);
        message2 = performance(temp2, player2);
        return {player1: message, player2: message2}
    },

    final_op_gt: function() {
        var temp = (player_1.score/10.0) * 100;
        var message = performance(temp, true);
        return message 
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

    gameType: function() {
        return one_player_game;
    },
    //event dispatcher
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        if (action.actionType != "START_GAME") {
            var player = activePlayer();
            var player_questions = activeQuestions();
            var player_id = player_1.isActive() ? 1 : 2;
        }
        var gameType;
        var currCount = count;
        var gameCount;
        var finalState; 
        var temp;
        switch(action.actionType) {
            case "START_GAME":
                startGame(action.item);
                break;      
            
            case "CHANGE_SCORE":
                if (action.item.answer) {
                    player.addScore();
                    AppStore.emitChange('score_update' + player_id);
                    console.log(player.score);
                }
                AppStore.emitChange('show_answer');
                break;

            case "SWITCH_TO_FLIPSCREEN":
                AppStore.emitChange('switch_to_flipscreen');
                break;

            case "SWITCH_FROM_FLIPSCREEN":
                AppStore.emitChange('switch_from_flipscreen');
                break;

            case "HIDE_ANSWER":
                currCount = count;
                if (one_player_game) { 
                    gameType = true; 
                    gameCount = 14; 
                }
                else { 
                    gameType = false; 
                    gameCount = 4; 
                }
                temp = (currCount == gameCount);
                if (gameType && temp) {
                    AppStore.emitChange('final_state');
                    break;
                }
                if (!gameType && temp) { 
                    if (two_player_count == 24) {
                        AppStore.emitChange('final_state');
                        break;
                    }
                    count = 0;
                    AppStore.emitChange('switch_to_flipscreen');
                    break;
                }
                AppStore.emitChange('update_question');
                two_player_count++;
                count++;
                break; 

            case "OUT_OF_QUESTIONS":
                AppStore.emitChange('out_of_questions');
                break;         

        return true; 
        }
    })
})

module.exports = AppStore;

