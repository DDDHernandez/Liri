require("dotenv").config();
var inquirer = require('inquirer');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Request = require('request');
var axios = require("axios");
var Spotify = new Spotify(keys.spotify);
var fs = require('fs')
//var moment = require('moment')
//Grabbing our keyword for searches
var Searchterm = process.argv.slice(3).join(" ");


//Liri's commands
//Using Liri's particular commands and your Searchterm you can search for some general information
//like Songs, Movies, and Concerts.

//If argv says spotify-this-song we search through Spotify's api with Searchterm your .env id and secret
//If no search term automatically search The Sign

if (process.argv[2] === "spotify-this-song") {
    if (Searchterm === "") {
        Searchterm = "The Sign"
    };
    Spotify.search({type: "track", query: Searchterm, limit: 1}, function(err, data) {
        if (err) {
            return console.log("Error: " + err)
        }
        console.log("Artist: "+data.tracks.items[0].album.artists[0].name);
        console.log("Track: "+data.tracks.items[0].name);
        console.log("Preview Link: "+data.tracks.items[0].preview_url);
        console.log("Album: "+data.tracks.items[0].album.name);
    })
}
//If argv says concert-this then search for first venue with bansintown api
//If no searchterm automatically search Maroon 5

else if (process.argv[2] === "concert-this") {
    if (Searchterm === ""){
        Searchterm = "Maroon 5"
    };
    axios.get("https://rest.bandsintown.com/artists/" + Searchterm + "/events?app_id=codingbootcamp").then (
        function(response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.country);
             console.log("Date: " + response.data[0].datetime)
        }
    )   
}
//If user commands movie-this then search for movie using IMDB's api
//If no Searchterm automatically search for Mr.Nobody

else if (process.argv[2] === "movie-this") {
    if (Searchterm === "") {
        Searchterm = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t="+Searchterm+"&y=&plot=short&apikey=trilogy").then (
        function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Released: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
         } ) 
}
//If user commands do-what-it-says then go get info from random.txt file 
//which will search spotify api for the song I want it that way

else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
        return console.log(error);
        }
    
        console.log(data);
    
        var dataArr = data.split(",");
    
        Spotify.search({ type: 'track', query: dataArr[1], limit:1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
            console.log("Artist: "+data.tracks.items[0].album.artists[0].name);
            console.log("Track: "+data.tracks.items[0].name);
            console.log("Preview Link: "+data.tracks.items[0].preview_url);
            console.log("Album: "+data.tracks.items[0].album.name);
           
        });
    });
}