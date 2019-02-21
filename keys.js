console.log('this is loaded');

//If need api key grab api key from .env
module.exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

