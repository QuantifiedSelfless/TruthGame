var React = require('react');
var AppActions = require('../actions/app-actions.js');

var PlayerAnswer = React.createClass({

    handler: function() {
        console.log(this.props.item);
        AppActions.changeScore(this.props.item);
    },

    render: function() {
        return (
            <div onClick={this.handler}>{this.props.item.title}</div>
        );
    }
    
});

module.exports = PlayerAnswer; 
