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
                <div className="question">
                    <h3>{this.props.questions[this.state.question_state].title}</h3>
                </div>
                <div>
                    <PlayerAnswer item={this.props.questions[this.state.question_state]} />
                </div>
            </div>
        )
    }

});

module.exports = PlayerQuestions;
