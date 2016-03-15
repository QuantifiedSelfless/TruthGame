var React = require('react');
var AppActions = require('../actions/app-actions.js');

var PlayerAnswer = React.createClass({

    handler: function() {
        AppActions.addScore(this.props.item)
    },

    render: function() {
        return (
            <div>
                <div onClick={this.handler} key={this.props.key}>{this.props.title}</div>
            </div>
        );
    }
    
});

module.exports = PlayerAnswer; 
