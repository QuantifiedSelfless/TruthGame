React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');

App = React.createClass({

    getInitialState: function() {   
        return { 
            player1: AppStore.getScore1(),
            player2: AppStore.getScore2(),
            currPlayer: 1,
            currState: 1,
            showResults: true,
            flipscreen: false
        }
    },
   
    componentWillMount: function() {
        AppStore.addChangeListener('switch_to_flipscreen', this._fliptoChange);
        AppStore.addChangeListener('switch_from_flipscreen', this._flipfromChange);
        AppStore.addChangeListener('increase_score', this._onChange);
    },
    _fliptoChange: function() {
        this.setState({
            flipscreen: true,
            currPlayer: AppStore.switchPlayer(),
            body: Flipscreen,

 
    render: {
        return (
            <div>
                <div>
                    <div>{this.state.showResults ? <PlayerScore player={'Player 1 score'} score={this.state.player1}/> : null}</div>
                    <div>{this.state.showResults ? <PlayerScore player={'Player 2 score'} score={this.state.player2}/> : null}</div>

        )
    }
});

module.exports = App;
