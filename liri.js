//Grab data from keys.js
require('dotenv').config();
var keys = require('./keys');

//Grab NPM modules

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var fs = require('fs');

//Gather the detail from 
var command2 = process.argv[2];
var command3 = process.argv[3];

//function for Twitter
var getTweets = function(){
	console.log('check that the tweets function fires')
	var client = new Twitter(keys.twitter);
	console.log(keys.twitter)
	var params = {
		screen_name:  'ProkoschPaul'
	}
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  		console.log('ensure that this client get runs')
    	for (var i=0; i<5; i++){
    		console.log (tweets[i].text)
    	};
		}
	})
}

function choice(terminalText){
	switch(terminalText){
		case "tweets":
		   getTweets();
		break
	}
}
choice(command2);