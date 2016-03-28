React = require('react');
AppActions = require('../actions/app-actions.js');

var AnswerScreen = React.createClass({
    getInitialState: function() { 
        return { 
            secondsElasped: 0,
        }
    },
    tick: function() {
        if (this.state.secondsElasped == 30) { 
            clearInterval(this.interval);
            AppActions.hideAnswer();
        }
        else {
            this.setState({secondsElasped: this.state.secondsElasped + 1});
        }
    }, 
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 30);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() {
        return (
            <h1>{this.props.stuff ? "Correct!" : "Incorrect!"}</h1>
        )
    }
});
module.exports = AnswerScreen;
