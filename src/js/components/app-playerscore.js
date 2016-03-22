React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');

var PlayerScore = React.createClass({

    render: function() {
        return (
            <div>
                <h2>{"Player " + this.props.player + "\'s Score: "}</h2>
                <h2>{this.props.score}</h2>
            </div>
        );
    }
});

module.exports = PlayerScore;          
