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
	console.log(keys.twitter);
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
//function to spotify a song
var spotifySong = function(song){
  console.log('check that the getSpotify function fires');
  var client2 = new Spotify(keys.spotify);
  console.log(keys.spotify);
  client2.search({ type: 'track', query: 'Blue'}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
      }
    } 
  });
}
//function to get movies
function getMovies(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you havent watch this movie do so soon);
    }
  });

}
function choice(terminalText){
	switch(terminalText){
		case "tweets":
		   getTweets();
		break;

		case"spotify":
			spotifySong();
		break;

		case"movies":
			getMovies();
		break;
}
}
choice(command2);