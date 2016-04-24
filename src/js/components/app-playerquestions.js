React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');
PlayerAnswer = require('./app-playeranswer.js');

var PlayerQuestions = React.createClass({ 

    getInitialState: function() {
        return { 
            question_state: 0
        }
    },
    
    componentWillMount: function() {
        AppStore.addChangeListener('update_question', this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener('update_question', this._onChange);
    },

    _onChange: function() {
        this.setState({ question_state: this.state.question_state + 1 });
    },
        
    render: function() {
        return  (
            <div>
                <div className="bubble">
                    <h3>{this.props.questions[this.state.question_state].title}</h3>
                </div>
                <div>
                    <PlayerAnswer socket={this.props.socket} player={this.props.player} item={this.props.questions[this.state.question_state].answer}/>
		    <img className="tree" src="Tree.png" alt="Design Craft Tree Logo"></img>
                </div>
            </div>
        )
    }

});

module.exports = PlayerQuestions;
