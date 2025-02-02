
// validates if 'is_favorite' value is a boolean (true/false)
const validateFavoriteSong = (req, res, next) => {
  const { is_favorite } = req.body;
    if (is_favorite === true || 
        is_favorite === false || 
        is_favorite === undefined) {
      next();
    } else {
      res.status(400).json({ error: "You forgot to make 'is_favorite' a boolean value" });
    }
};
  
  // validates if 'song name' input is present
const validateSongName = (req, res, next) => {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ error: "You forgot to include the name of the song" });
    }
};
  
  // validates if 'artist name' input is present
const validateArtistName = (req, res, next) => {
    if (req.body.artist) {
      next();
    } else {
      res.status(400).json({ error: "You forgot to include the name of the artist" });
    }
};
  

module.exports = {
  validateFavoriteSong,
  validateSongName,
  validateArtistName,
};