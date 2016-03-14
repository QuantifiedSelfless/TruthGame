'use strict';
var React = require('react');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('event').EventEmitter;

class questions {
    constructor(datablob, answer) {
        this.total = datablob;
        this.answer = answer;
        this.buttonList = [];
    },
    randomArr: function() {
        var arr = [];
        //i determines how many random numbers, t determines the range. Range will be based on how many questions are currently in this.total
        for (var i=0, t=this.total.length; i<5; i++) {
            arr.push(Math.round(Math.random() * t))
        }
        return arr;
    },
    create_button_list: function() {
        random_questions = randomArr();
        for (var i = 0; i<5; i++) {
            buttonList.push({
                'id': i + 1,
                'title': this.total[random_questions[i]],
                'answer': this.answer
            });
            this.total.splice(random_questions[i], 1);
        }
    },
    clearButtons: function() {
        buttonList = [];
    }
}

     
var false_statements = ['You have used \"Your\" incorrectly on social media 74% of the time', 'You have 18 pending facebook messages you never responded to', 'You are friends with your mother on facebook', ''];

//replace with database call
var player1_statements = ['You have 759 friends on facebook', 'You\'ve said pasta 57 times in the last 3 years', 'You are more active on twitter after 9 pm''You\'ve commented \"Happy Birthday\" to 278 people since you started your first social media account']; 
var player2_statements = [''];

App_questions = new questions(false_statements, false);
player1_questions = new questions(player1_statements, true);
player2_questions = new questions(player2_statements, false);

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

function activeQuestion() {
    var question = Player_1.isActive() ? player1_questions : player2_questions;
    return question;
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
        return App_Questions.buttonList;
    },
    makeFalseList: function() {
        return App_Questions.create_button_list;
    },
    getTrueList: function() {
        return activeQuestion().buttonList;
    },
    makeTrueList: function() {
        return activeQuestion().create_button_list;
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
                    AppStore.emitChange('score_update');
                }
                AppStore.emitChange('update_question');
                break;
            case "SWITCH_TO_FLIPSCREEN":
                AppStore.emitChange('switch_to_flipscreen');
                break;
            case "SWITCH_FROM_FLIPSCREEN":
                AppStore.emitChange('switch_from_flipscreen");
                break;
        return true; 
        }
    })
})

module.exports = AppStore;

