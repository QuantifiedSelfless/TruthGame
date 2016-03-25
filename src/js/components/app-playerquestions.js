React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');
PlayerAnswer = require('./app-playeranswer.js');

lodash = require('lodash');

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
        var true_items = this.props.truth.map( function(item, i) {
            return (
                <PlayerAnswer item={item} />
            )
        })

        var false_items = this.props.lies.map( function(item, i) {
            return (
                <PlayerAnswer item={item} />
            )
        })
        var items = [true_items, false_items] 
        items = lodash.shuffle(items); 
        return  (
            <div>
                <div>
                    {items[0][this.state.question_state]}
                    {items[1][this.state.question_state]}
                </div>
            </div>
        );
    }

});

module.exports = PlayerQuestions;
