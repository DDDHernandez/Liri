require("dotenv").config();
var inquirer = require('inquirer');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Request = require('request');
var axios = require("axios");
var Spotify = new Spotify(keys.spotify);

var term = process.argv.slice(3).join(" ");



if (process.argv[2] === "spotify-this-song") {
    if (term === "") {
        term = "The Sign"
    };
    spotify.search({type: "track", query: term, limit: 1}, function(err, data) {
        if (err) {
            return console.log("Error: " + err)
        }
        console.log("Artist: "+data.tracks.items[0].album.artists[0].name);
        console.log("Track: "+data.tracks.items[0].name);
        console.log("Preview Link: "+data.tracks.items[0].preview_url);
        console.log("Album: "+data.tracks.items[0].album.name);
    })
}

else if (process.argv[2] === "concert-this") {
    if (term === ""){
        term = "Maroon 5"
    };
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then (
        function(response) {
            console.log("Venue: " + response.data.venue[1].name);
            console.log("Location: " + response.data.venue[1].country);
            console.log("Date: " + response.data.venue[1].datetime)
        }
    )   
}

else if (process.argv[2] === "movie-this") {
    if (term === "") {
        term = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t="+term+"&y=&plot=short&apikey=trilogy").then (
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

else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
        return console.log(error);
        }
    
        console.log(data);
    
        var dataArr = data.split(",");
    
        spotify.search({ type: 'track', query: dataArr[1], limit:1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
            console.log("Artist: "+data.tracks.items[0].album.artists[0].name);
            console.log("Tract: "+data.tracks.items[0].name);
            console.log("Preview Link: "+data.tracks.items[0].preview_url);
            console.log("Album: "+data.tracks.items[0].album.name);
        });
    });
}