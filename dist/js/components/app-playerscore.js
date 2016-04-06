React = require('react');

var PlayerScore = React.createClass({

    render: function() {
		if (this.props.player == 1){
			addedclass = "p1score";
		} else {
			addedclass = "p2score";
		}
        return (
            <div className={addedclass}>
                <h2>{"Player " + this.props.player + "\'s Score: "}</h2>
                <h2>{this.props.score}</h2>
            </div>
        );
    }
});

module.exports = PlayerScore;          
