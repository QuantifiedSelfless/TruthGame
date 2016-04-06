React = require('react');
AppActions = require('../actions/app-actions.js');

var FlipScreen = React.createClass({
    forward: function() {
        AppActions.flipFromScreen();
    },
    render: function() {
        return (
			<div>
            <div className="flip">
                <button onClick={this.forward}>Continue</button>
 
            </div>
			<div>
				<h3 className="bubble">{!this.props.stuff ? "Player 2, it's your turn. Press a button to continue." : "Player 1 ,it's your turn. Press a button to continue."}</h3>
				<img className="tree" src="../src/js/img/Tree.png" alt="Design Craft Tree Logo"></img>
				
			</div>
			</div>
        )
    }
});

module.exports = FlipScreen;
