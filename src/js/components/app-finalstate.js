React = require('react');

FinalState = React.createClass({
    render: function() {
        return (
            <h1>{!this.props.stuff ? 'Player 1 is Victorious!' : 'Player 2 is Victorious'}</h1>
        )
    }
});
module.exports = FinalState; 
