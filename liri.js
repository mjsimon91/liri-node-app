require('dotenv').config();
var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//creating a variable for the argument

var arg = process.argv
var userTweet
//Get the argumet for the command

var command = arg[2];

// show your last 20 tweets and when they were created
  if (command == "tweets") {
    twitter();
  }
//This will show the following information about the song

// * Artist(s)
// * The song's name
// * A preview link of the song from Spotify
// * The album that the song is from
// * If no song is provided then your program will default to "The Sign" by Ace of Base.


// A function that will allow us to get the most recent tweets from Twitter

function twitter(){
  client.get('statuses/user_timeline', {user_id:'MatthewJaySimon'}, function(error, tweets, response){
    if (error) {
      console.log(error);
      }else {
        //Go through each tweet in the response and create an object that will contain the tweet time and the tweet itself
        for (var i = 0; i < tweets.length; i++) {
          userTweet = new Object ();                    //Create a new object
          userTweet.createdAt = tweets[i].created_at;   //Add the createdAt time to the userTweet object
          userTweet.text = tweets[i].text;              //Add the tweet text to the userTweet object

          console.log(userTweet);

        } // End the for loop
    } // End the else statement
  }) //End the call to Twitter
} //End the twitter function
