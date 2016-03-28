React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');

FlipScreen = require('./app-flipscreen.js');
PlayerPick = require('./app-playerpick.js');
PlayerQuestions = require('./app-playerquestions.js');
PlayerScore = require('./app-playerscore.js');
AnswerScreen = require('./app-answerscreen.js');
PlayerAnswer = require('./app-playeranswer.js');
FinalState = require('./app-finalstate.js');
var App = React.createClass({

    getInitialState: function() {   
        return {
            player1: 0,
            player2: 0,
            currPlayer: AppStore.currentPlayer(),
            body: PlayerQuestions,
            t_question_list: AppStore.makeTrueList(),
            f_question_list: AppStore.makeFalseList(),
            showResults: true,
            flipscreen: false,
            showAnswer: false,
            answer: false
        }
    },
   
    componentWillMount: function() {
        AppStore.addChangeListener('score_update1', this._onChange1);
        AppStore.addChangeListener('score_update2', this._onChange2);
        AppStore.addChangeListener('finalstate', this._finalstate);
        AppStore.addChangeListener('switch_to_flipscreen', this._fliptoChange);
        AppStore.addChangeListener('switch_from_flipscreen', this._flipfromChange);
        AppStore.addChangeListener('show_answer', this._showAnswer);
        AppStore.addChangeListener('update_question', this._hideAnswer);
    },

    _showAnswer: function() {
        this.setState({ showAnswer: true });
    },
    _hideAnswer: function() {
        this.setState({ 
            showAnswer: false,
            answer: false
        });
    },
    _onChange1: function() {
        this.setState({ 
            player1: this.state.player1 + 1, 
            answer: true
        });
    },
    _onChange2: function() {
        this.setState({ 
            player2: this.state.player2 + 1,
            answer: true
        });
    }, 
    _fliptoChange: function() {
        this.setState({
            showAnswer: false,
            showResults: false,
            flipscreen: true,
            currPlayer: AppStore.switchPlayer(),
            body: FlipScreen,
        });
    },

    _flipfromChange: function() {
        this.setState({
            flipscreen: false,
            body: PlayerQuestions,
            t_question_list: AppStore.makeTrueList(),
            showResults: true
        });
    },

    _finalstate: function() {
        this.setState({
            showResults: false,
            showAnswer: false,
            body: FinalState
        });
    },

    render: function() {
        console.log(AppStore.currentPlayer());
        return (
            <div>
                <div>
                    <div>{this.state.showResults ? <PlayerScore player={1} score={this.state.player1}/> : null}</div>
                    <div>{this.state.showResults ? <PlayerScore player={2} score={this.state.player2}/> : null}</div>
                </div>
                <div>
                    <this.state.body truth={this.state.t_question_list} lies={this.state.f_question_list} stuff={AppStore.currentPlayer()}/>
                </div>
                <div>{this.state.showAnswer ? <AnswerScreen stuff={this.state.answer}/> : null}</div>
            </div>
        )
    }
});

module.exports = App;
