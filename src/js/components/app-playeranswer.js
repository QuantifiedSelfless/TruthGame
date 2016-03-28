React = require('react');
AppActions = require('../actions/app-actions.js');

var PlayerAnswer = React.createClass({

    handler: function() {
        AppActions.changeScore(this.props.item);
    },

    render: function() {
        return (
            <div onClick={this.handler}>{this.props.item.title}</div>
        );
    }
    
});

module.exports = PlayerAnswer; 
