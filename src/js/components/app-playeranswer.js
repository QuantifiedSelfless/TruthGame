React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');

var PlayerAnswer = React.createClass({
    getInitialState: function() {
        return {
            click: this.handler
        }
    },
    handler: function() {
        AppActions.changeScore(this.props.item);
    },
    componentWillMount: function() {
        AppStore.addChangeListener('show_answer', this._onChange1);
        AppStore.addChangeListener('update_question', this._onChange2);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener('show_answer', this._onChange1);
        AppStore.removeChangeListener('update_question', this._onChange2);
    }, 
    _onChange1: function() {
        this.setState({ click: null });
    },
    _onChange2: function() {
        this.setState({ click: this.handler });
    },
    render: function() {
        return (
        	<div className="buttons">
            	<button onClick={this.state.click}>True</button>
            	<button onClick={this.state.click}>False</button>
            </div>
        );
    }
    
});

module.exports = PlayerAnswer; 
