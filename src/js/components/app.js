React = require('react');
AppStore = require('../stores/app-store.js');
AppActions = require('../actions/app-actions.js');

App = React.createClass({

    getInitialState: function() {   
        return { 
        }
    },
   
    componentWillMount: function() {
    }, 
    
    render: {
        return (
            <h1>Hello World</h1>
        )
    }
});

module.exports = App;
