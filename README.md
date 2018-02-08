# liri-node-app
This will be a Language Interpretation and Recognition Interface that will take in parameters and return data respective to the search that you are trying to make. You will be able to search across:

* The Twitter user MatthewJaySimon and view a list of the 20 most recent tweets
* Search Spotify and receivie information on a particular song
* Search OMDB to receive specific information about a particular movie
* View the text in an outside file (which will soon be applied to searching spotify with thatever is in that file)
* Coming Soon (View a list of commands sent)

In order to make this app work, you will need to have the following item from Twitter in a .env file in the same repository as the liri.js app:

* A Twitter Consumer Key
* A Twitter Consumer Secret
* A Twitter Access Token
* A Twitter Access Token Secret
* A Spotify ID
* A Spotify Secret

You can visit  <https://apps.twitter.com/app/new> in order to get your Twitter specific credentials and go to <developer.spotify.com> in order to get those specific keys.

In order to access the app, find the liri-node-app on your terminal and open the directory. In order to run the application, you can use the following commands:

* Access the feed of @MatthewJaySimon by enterting 'node liri.js my-tweets'
* Find high level information on a song on Spotify by entering 'node liri.js spotify-this-song <song name>'
* Find high level information on a movie from OMDB by entering 'node liri.js movie-this <movie-name>'
* Find out what is in the random.txt file by entering 'node liri.js do-what-it-says`

For the song and movie, they require an exact match on an existing song or movie.
