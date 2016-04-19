App = require('./components/app.js'); 
AppActions = require('./actions/app-actions.js');
ReactDOM = require('react-dom');
$ = require('jquery');

function getURLParams() {
    var re = /[?&]([^&=]+)(?:[&=])([^&=]+)/gim;
    var m;
    var v={};
    while ((m = re.exec(location.search)) != null) {
        if (m.index === re.lastIndex) {
        re.lastIndex++;
    }
    v[m[1]]=m[2];
    }
    return v;
};

function make_AJAX_call(player_rfid, tryCount, retryLimit, player_callback){
    $.ajax({
        type: 'GET',
        url: "http://quantifiedselfbackend.local:6060/truth_processor/truth",
        data: player_rfid,
        success: function(resp) {
            console.log(resp);
            //Whatever logic for a true
            player_callback(null, resp['data']);            
        },  
        error: function(resp) {
            console.log("Error: Ajax call failed"); 
            tryCount++;
            if (tryCount >= retryLimit){
                //Do whatever for an error
                window.location = "www.google.com";
            }
            else { //Try again with exponential backoff.
                setTimeout(function(){ 
                    return make_AJAX_call(player_rfid, tryCount, retryLimit);
                }, Math.pow(2, tryCount) * 1000);
                player_callback(resp, null);
            }
        }
    });
    
};

function prepGame() {
    //get url
    var player_ids;
    var keys;
    var player2 = false;
    var data = [];
    var temp_players = [];
    var count = 0;
    player_ids = getURLParams();
    keys = Object.keys(player_ids) 
    if (keys.length == 2) {
        for (var p in player_ids) {
            make_AJAX_call({rfid: player_ids[p]}, 0, 3, (err, data)=>{
                if(err) {console.log('there was an error')}
                else {
                    temp_players.push(data);
                    count++;
                    if (count == 2) {
                        ReactDOM.render(<App game_players={temp_players}/>, document.getElementById('main'));
                    } 
                }
            }); 
        }   
    }
    else {
        console.log(player_ids);
        make_AJAX_call({rfid: player_ids['rfid0']}, 0, 3, (err, data)=>{
                if(err) {console.log('there was an error')}
                else {
                    temp_players.push(data);
                    count++;
                    if (count == 1) {
                        ReactDOM.render(<App game_players={temp_players}/>, document.getElementById('main'));
                    } 
                }
        }); 
    }
}; 
prepGame(); 
