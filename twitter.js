//express frame

//create a server
var express = require('express');
var app = express();

/*app.get('/', function (req, res) {
  res.send('Success connect!')
});*/

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Twitter listening at http://%s:%s', host, port);

});
// server route handler
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// serving static files 
app.use(express.static(__dirname));


//Setup API by ntwitter
var twitter = require('twitter');

var twit = new twitter({
  consumer_key: 'TVnxUPDKZNRn8l8DXgblRSY9e',
  consumer_secret: '6pr84NIpiSsn2ICsn6oyuZ0mHXQ53tLKKQnjjQYvpIoBKOwrYg',
  access_token_key: '2743221905-DkZbWgQOuxPjeeG4cv1DiVExeJiwzJ7Me3yMzyA',
  access_token_secret: 'BmuMvP6ADipSoUOrTTxNuNt8AdO7DQWVMMfeDXLFNb7iM'
});


//fs module
var count;
function getTweet(count){
 var fs = require('fs');
 /*
var options = { //screen_name: 'tom Hiddleston',
                //user_id: 391037985,
                //q: '@twhiddleston',
                //since_id:391037985,
                track: 'tom Hiddleston'};
*/
  twit.get('statuses/user_timeline',  function(error, tweets,response) {
  	console.log(tweets);
    var tweet = [];
  	fs.appendFile('convention-tweets.json', JSON.stringify(tweets,null,4), function (err) {
    	
  			if (err) throw err;
  				else count--;
  		console.log('It\'s saved!');

        if(count >= 0){
          tweet.push(tweets);
        }
  			else{
  				stream.on('destroy', function (response) {
    			// Handle a 'silent' disconnection from Twitter, no end/error event fired
  				});
  				// Disconnect stream after 2 seconds
 				setTimeout(stream.destroy, 2000);
  			}
		});
   // document.getElementById("out").innerHTML = tweet ;
  });
}

getTweet(10);