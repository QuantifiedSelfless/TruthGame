React = require('react');
AppActions = require('../actions/app-actions.js');

var FlipScreen = React.createClass({
    
    handler: function() {
        AppActions.flipFromScreen()
    },

    render: function() {
        return (
            <div>
                <img src="../src/js/img/arrows-26-128.png"></img>
                <button onClick={this.handler}>Continue</button>
            </div>
        )
    }
});

module.exports = FlipScreen;
