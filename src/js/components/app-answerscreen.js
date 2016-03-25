React = require('react');

var AnswerScreen = React.createClass({
    setInitialState: function() {
       return { secondsElasped: 0 }
    },
    tick: function() {
        if (this.secondsElasped == 5) { AppActions.hideAnswer() } 
        this.setState({secondsElasped: this.secondsElasped + 1});
    }, 
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 5);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() { 
        return (
            <h1>{this.props.answer ? "Correct!" : "Incorrect!"}<h1>
        )
    }
});
module.exports = AnswerScreen;
