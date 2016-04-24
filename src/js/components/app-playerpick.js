React = require('react');

var PlayerPick = React.createClass({ 
    render: function() {
        return (
            <h2 className="nowplaying">{!this.props.stuff ? "Player 1 is currently playing" : "Player 2 is currently playing"}</h2>
        )
    }

});

module.exports = PlayerPick;
