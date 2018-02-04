require('dotenv').config();
var keys = require('./keys.js');

// fs is a core Node package for reading and writing files
var fs = require("fs");


var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//creating a variable for the argument

var arg = process.argv;

// Variables used for Twitter
var userTweet;          // This will store the tweets from the user
var songName = arg[3];       // This is the name of the song that the user enters

// Variables for Spotify
var song, album, songPreview, artist, songObject;

//Variables for omdb
var movieName = arg[3];
var rating

//Get the argumet for the command

var command = arg[2];

// show your last 20 tweets and when they were created
  if (command == "my-tweets") {
    twitter();
  } else if (command == "spotify-this-song") {
    spotifySong();
  } else if (command == "movie-this") {
    omdbSearch();
  } else if (command == "do-what-it-says") {
    readFile();
  }



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

//Creating a function for when the user requests information about a song

function spotifySong(){

  //Creating a loop that will be able to consume a ful song name

  for( var i = 4; i < arg.length; i++){
    songName = songName + "+" + arg[i];
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
    } else {

    songObject = new Object ();
    //This will show the following information about the song
    for (var i = 0; i < data.tracks.items.length; i++) {

      // * The song's name
      song = data.tracks.items[i].name;

      // * The album that the song is from
      album = data.tracks.items[i].album.name;

      // * A preview link of the song from Spotify
      songPreview = data.tracks.items[i].preview_url;

      //Creating an object to contain the song information

      songObject.songName = song;
      songObject.songAlbum = album;
      songObject.songPreview = songPreview;

      //Need to create a loop to get the artists array
      for (var j = 0; j < data.tracks.items[i].album.artists.length; j++) {

        // * Artist(s)
        artist = (data.tracks.items[i].album.artists[j].name)

        songObject.artist = artist
      }
      console.log(songObject);
    } // end the for loop
    // * If no song is provided then your program will default to "The Sign" by Ace of Base.
  } // end the else statement
}); // end the spotify search
} //End Spotify function

function omdbSearch(){
  for (var i = 4; i < arg.length; i++) {
    movieName = movieName + "+" + arg[i];
}
console.log(movieName);
  request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName + "'", function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log(JSON.stringify(body)); // Print the HTML for the Google homepage.

  //Turn the string into an object
  var obj = JSON.parse(body);

  //Get the title of the movie
  var title = obj.Title;
  //Get the Year of the move
  var yearReleased = obj.Year;
  // Get the Country where the movie was produced.
  var country = obj.Country;
  // Get the Language of the movie.
  var language = obj.Language;
  // Get the plot of the movie.
  var plot = obj.Plot;
  // Get the actors in the movie.
  var actors = obj.Actors;

  //Get movie ratings
if (obj.Ratings != null) {
  for (var i = 0; i < obj.Ratings.length; i++) {
    rating = obj.Ratings[i];
    //Create an object for all of the movies and add them
    var movie = new Object();
    movie.title = title;
    movie.yearReleased = yearReleased;
    movie.rating = rating;
    movie.country = country;
    movie.language = language;
    movie.plot = plot;
    movie.actors = actors
  }
} else {
  //Create an object for all of the movies and add them
  var movie = new Object();
  movie.title = title;
  movie.yearReleased = yearReleased;
  movie.country = country;
  movie.language = language;
  movie.plot = plot;
  movie.actors = actors
}




  console.log(movie);
});

} //End omdb search

// This block of code will read from the "movies.txt" file.

function readFile(){
  fs.readFile("random.txt","utf8", function(error, data){
    if(error){
      console.log(error);
    } else {
      console.log(data);
      // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);
    }
  })

}
