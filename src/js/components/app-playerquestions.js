React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');
PlayerAnswer = require('./app-playeranswer.js');

PlayerQuestions = React.createClass({ 

    getInitialState: function() {
        return { 
            question_state: 0
        }
    },
    handler: function() {
        AppActions.flipToScreen()
    },
    
    componentWillMount: function() {
        AppStore.addChangeListener('update_question', this._onChange);
    },
    
    _onChange: function() {
        this.setState({ question_state: this.state.question_state + 1 });
    },
        
    render: function() {
        var true_items = [];
        var false_items = [];
        
        for (var i=0; i<5; i++) {

            true_items.push(this.props.truth.map( function(item, i) {
                return (
                    <PlayerAnswer item={item} key={i}/>
                )
            }))

            false_items.push(this.props.lies.map( function(item, i) {
                return (
                    <PlayerAnswer item={item} key={i}/>
                )
            }))

        }

        return  (
            <div>
                <div>{true_items[this.state.question_state]}</div>
                <div>{false_items[this.state.question_state]}</div>
            </div>
        );
    }

});

module.exports = PlayerQuestions;
