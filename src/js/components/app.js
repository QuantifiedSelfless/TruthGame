React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');

FlipScreen = require('./app-flipscreen.js');
PlayerPick = require('./app-playerpick.js');
PlayerQuestions = require('./app-playerquestions.js');
PlayerScore = require('./app-playerscore.js');

App = React.createClass({

    getInitialState: function() {   
        return { 
            player1: AppStore.getScore1(),
            player2: AppStore.getScore2(),
            currPlayer: AppStore.activePlayer(),
            body: PlayerQuestions,
            showResults: true,
            flipscreen: false
        }
    },
   
    componentWillMount: function() {
        AppStore.addChangeListener('finalstate', this._finalstate);
        AppStore.addChangeListener('switch_to_flipscreen', this._fliptoChange);
        AppStore.addChangeListener('switch_from_flipscreen', this._flipfromChange);
    },
    _fliptoChange: function() {
        this.setState({
            showResults: false,
            flipscreen: true,
            currPlayer: AppStore.switchPlayer(),
            body: Flipscreen,
        });
    },

    _flipfromChange: function() {
        this.setState({
            flipscreen: false,
            body: PlayerQuestions,
            showResults: true
        });
    },

    _finalstate: function() {
        this.setState({
            showResults: false,
            body: FinalState
        })
    },

    render: {
        return (
            <div>
                <div>
                    <div>{this.state.showResults ? <PlayerScore player={1}/> : null}</div>
                    <div>{this.state.showResults ? <PlayerScore player={2}/> : null}</div>
                </div>
                <div>
                    {this.state.body}
                </div>
            </div>
        )
    }
});

module.exports = App;
