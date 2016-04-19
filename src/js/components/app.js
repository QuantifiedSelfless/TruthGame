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
io = require('socket.io-client');

var gameStart = false;
var socket2 = io.connect('http://localhost:3000')

socket2.on('rfid', function(data){
    console.log('hello');
    setTimeout(function() { window.location = "http://localhost:8000"}, 2000)
})

var App = React.createClass({

    getInitialState: function() {   
        if (!gameStart) {AppActions.startGame(this.props.game_players)}
        return {
            score: 0,
            player1: 0,
            player2: 0,
            currPlayer: AppStore.currentPlayer(),
            body: PlayerQuestions,
            question_list: AppStore.makeQuestionList(),
            showPlayer: true,
            showResults: true,
            showAnswer: false,
            answer: false,
            gameType: AppStore.gameType()
        }
    },
   
    componentWillMount: function() {  
        AppStore.addChangeListener('score_update1', this._onChange1);
        AppStore.addChangeListener('final_state', this._finalState);
        AppStore.addChangeListener('show_answer', this._showAnswer);
        AppStore.addChangeListener('update_question', this._hideAnswer);
        if (this.state.gameType) {
            AppStore.addChangeListener('score_update2', this._onChange2);
            AppStore.addChangeListener('switch_to_flipscreen', this._fliptoChange);
            AppStore.addChangeListener('switch_from_flipscreen', this._flipfromChange);
        }
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
            showPlayer: false,
            showAnswer: false,
            showResults: false,
            currPlayer: AppStore.switchPlayer(),
            body: FlipScreen,
        });
    },

    _flipfromChange: function() {
        this.setState({
            showPlayer: true,
            body: PlayerQuestions,
            t_question_list: AppStore.makeQuestionList(),
            showResults: true
        });
    },

    _finalState: function() {
        this.setState({
            showPlayer: false,
            showResults: false,
            showAnswer: false,
            score: AppStore.getGameWinner(this.state.gameType),
            body: FinalState
        });
    },

   render: function() { 
        var temp1 = (
            <div>
                <div>{this.state.showResults ? <PlayerScore player={1} score={this.state.player1}/> : null}</div>
                <div>{this.state.showResults ? <PlayerScore player={2} score={this.state.player2}/> : null}</div>
            </div>
        );
        var temp2 = ( 
                <div>
                    <div>{this.state.showResults ? <PlayerScore player={1} score={this.state.player1}/> : null}</div>
                </div>
        );
        return (
            <div>
                {!this.state.gameType ? temp1 : temp2}
                <div>
                    <this.state.body player={this.state.currPlayer} questions={this.state.question_list} score={this.state.score} />
                </div>
                <div>
                    <div>{this.state.showPlayer ? <PlayerPick stuff={this.state.currPlayer} /> : null}</div>
                    <div>{this.state.showAnswer ? <AnswerScreen stuff={this.state.answer} /> : null }</div>
                </div>
            </div>
        )
    }
});

module.exports = App;
