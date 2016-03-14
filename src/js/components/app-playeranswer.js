var React = require('react');
var AppActions = require('../actions/app-actions.js');

var PlayerAnswer = React.createClass({

    handler: function() {
        AppActions.addScore(this.props.item)
    },

    render: function() {
        return (
            <div>
                <button onClick={this.handler} key={this.props.key}></button>
            </div>
        );
    }
    
});

module.exports = PlayerAnswer; 
