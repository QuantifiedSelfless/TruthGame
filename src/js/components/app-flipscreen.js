React = require('react');
AppActions = require('../actions/app-actions.js');

var FlipScreen = React.createClass({
    componentDidMount: function() {
        if (!this.props.player) {
            this.props.socket.on('button1', this.handler); 
            this.props.socket.on('button2', this.handler);
        } 
        else {
            this.props.socket.on('button3', this.handler); 
            this.props.socket.on('button4', this.handler);
        } 
    },
    componentWillUnmount: function() {
        console.log('removed flipscreen');
        this.props.socket.removeListener('button1', this.handler); 
        this.props.socket.removeListener('button2', this.handler);
        this.props.socket.removeListener('button3', this.handler); 
        this.props.socket.removeListener('button4', this.handler);
    },  
    handler: function() {
        AppActions.flipFromScreen();
    },
    
    render: function() {
        return (
	    <div>
	        <div>
	            <h3 className="bubble">{!this.props.player ? "Player 2, it's your turn. Press a button to continue." : "Player 1 ,it's your turn. Press a button to continue."}</h3>
	            <img className="tree" src="Tree.png" alt="Design Craft Tree Logo"></img>
	        </div>
	    </div>
        )
    }
});

module.exports = FlipScreen;
