React = require('react');
AppActions = require('../actions/app-actions.js');
io = require('socket.io-client');
var socket;
var FlipScreen = React.createClass({
    componentDidMount: function() {
        socket = io.connect('http://localhost:3000');
        if (!this.props.player) {
            socket.on('button1', this.handler); 
            socket.on('button2', this.handler);
        } 
        else {
            socket.on('button3', this.handler); 
            socket.on('button4', this.handler);
        } 
    },
    componentWillUnmount: function() {
        socket.close()
    },  
    handler: function() {
        AppActions.flipFromScreen();
    },
    
    render: function() {
        return (
	    <div>
	        <div>
	            <h3 className="bubble">{!this.props.player ? "Player 1, it's your turn. Press a button to continue." : "Player 2, it's your turn. Press a button to continue."}</h3>
	            <img className="tree" src="Tree.png" alt="Design Craft Tree Logo"></img>
	        </div>
	    </div>
        )
    }
});

module.exports = FlipScreen;
