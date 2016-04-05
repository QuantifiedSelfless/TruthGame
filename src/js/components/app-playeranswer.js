React = require('react');
AppActions = require('../actions/app-actions.js');

var PlayerAnswer = React.createClass({

    handler: function() {
        AppActions.changeScore(this.props.item);
    },

    render: function() {
        return (
        	<div className="buttons">
            	<button onClick={this.handler}>True</button>
            	<button onClick={this.handler}>False</button>
            </div>
        );
    }
    
});

module.exports = PlayerAnswer; 
