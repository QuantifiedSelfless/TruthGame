React = require('react');
AppActions = require('../actions/app-actions.js');

var PlayerScore = React.createClass({
    
    render: function() {
        return (
            <h2>{this.props.player}<h2>
            <h2>{this.props.score}<h2>
        )
    }
});
module.exports = PlayerScore;          
