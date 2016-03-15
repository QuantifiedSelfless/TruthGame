React = require('react');
AppActions = require('../actions/app-actions.js');

var PlayerScore = React.createClass({

    getInitialState: function() {
        return {
            player: "Player " + this.props.player + "\'s Score: ",
            score: 0
        }
    },

    componentWillMount: function() {
        AppStore.addChangeListener(('score_update' + this.props.player), this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(('score_update' + this.props.player), this._onChange);
    },
    
    _onChange: function() {
        this.setState({ score: this.state.score + 1 });
    },

    render: function() {
        return (
            <h2>{this.state.player}<h2>
            <h2>{this.state.score}<h2>
        )
    }
});
module.exports = PlayerScore;          
