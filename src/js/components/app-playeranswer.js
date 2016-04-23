React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');
io = require('socket.io-client');
var flag = true;
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
        if (flag) {
            flag = false;
            return this.handler(temp);       
        }
    },

    false_button: function() {
        var temp = (this.props.item == false);
        if (flag) {
            flag = false;
            return this.handler(temp);       
        }
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
        AppStore.addChangeListener('update_question', this._onChange2);
    },

    componentWillUnmount: function() {
        socket.close();
        flag = true;
        AppStore.removeChangeListener('update_question', this._onChange2);
    }, 

    _onChange2: function() {
        flag = true;
        //this.setState({ 
        //    true_press: this.true_button,
        //    false_press: this.false_button
        //});
    },

    render: function() {
        return (
            <div></div>
        ); 
    }
    
});

module.exports = PlayerAnswer; 
