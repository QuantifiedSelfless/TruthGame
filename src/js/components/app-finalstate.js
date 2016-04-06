React = require('react');

FinalState = React.createClass({ 
    render: function() {
        return (
            <h1>{this.props.score}</h1>
        )
    }
});
module.exports = FinalState; 
