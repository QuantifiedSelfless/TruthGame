React = require('react');
AppStore = require('../stores/app-store.js');

FinalState = React.createClass({ 
    componentDidMount: function() {
        setTimeout(function() { window.location = "http://localhost:8000" }, 10000);
    },
    render: function() {
        var temp;
        var final_message;
        switch(this.props.finishGame) {
            case 'One Player Game':
                temp = (
                    <div className="blob">
                        <h1 className="victory center">Player 1 was the only player.</h1>
                        <h1 className="victory center">{"Player 1: " + AppStore.final_op_gt()}</h1>
                    </div>
                )
                break;                               
            case 'Game Tied':
                temp = (
                    <div className="blob">
                        <h1 className="victory center">Both Players Tied!</h1>
                        <h1 className="victory center">{"Players: " + AppStore.final_op_gt()}</h1>
                    </div>
                )
                break; 
            case 'Game Winner':
                final_message = AppStore.final_two_player();
                temp = (
                    <div className="blob">
                        <h1 className="victory center">{AppStore.getFinalTitle()}</h1>
                        <h1 className="victory center">{'Player 1: ' + final_message.player1}</h1>
                        <h1 className="victory center">{'Player 2: ' + final_message.player2}</h1>
                    </div>
                )
                break;
            break;
        }
        return (
            <div>
                {temp}
            </div>
        )
    }
});
module.exports = FinalState; 
