React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');
io = require('socket.io-client');
var socket;
var PlayerAnswer = React.createClass({
    getInitialState: function() {
        return {
            true_press: this.true_button,
            false_press: this.false_button
        }
    },
     
    handler: function(button_boolean) {
        AppActions.changeScore({answer: button_boolean})
    },

    true_button: function() {
        var temp = (this.props.item == true);
        return this.handler(temp);       
    },

    false_button: function() {
        var temp = (this.props.item == false);
        return this.handler(temp);       
    },

    componentDidMount: function() {
        socket = io.connect('http://localhost:3000'); 
        if (!this.props.player) {
            socket.on('button1', this.state.true_press); 
            socket.on('button2', this.state.false_press);
        }
        else {
            socket.on('button3', this.state.true_press);
            socket.on('button4', this.state.false_press);
        }
    },

    componentWillMount: function() {
        AppStore.addChangeListener('show_answer', this._onChange1);
        AppStore.addChangeListener('update_question', this._onChange2);
    },

    componentWillUnmount: function() {
        socket.close();
        AppStore.removeChangeListener('show_answer', this._onChange1);
        AppStore.removeChangeListener('update_question', this._onChange2);
    }, 

    _onChange1: function() {
        this.setState({ 
            true_press: null,
            false_press: null
        });
    },

    _onChange2: function() {
        this.setState({ 
            true_press: this.true_button,
            false_press: this.false_button
        });
    },

    render: function() {
        return true; 
    }
    
});

module.exports = PlayerAnswer; 
