// Dependencies
const express = require("express");
const songs = express.Router();
const {
    getAllSongs,
    getOneSong,
    createSong,
    deleteSong,
    updateSong 
} = require("../queries/songs.js");

const {validateURL} = require("../validations/validations.js")


// Index (all songs)
songs.get("/", async (req, res) => {
    //http://localhost:3445/songs
    const allSongs = await getAllSongs();
    if (!allSongs.error) {
        res.status(200).json(allSongs);
    } else {
        res.status(500).json({ error: "server error" });
    }
});

// Show (one/individual song)
songs.get('/:id', async (req, res) => {
    const { id } = req.params;
    const song = await getOneSong(id);
    console.log(song);
    if (!song.error) {
        res.status(200).json(song);
    } else if (song.error.code === 0) {
        res.status(404).json({ error: "song not found"})
    } else {
        res.status(500).json({error: "server error"})
    }
});

// Create
songs.post(
    '/', validateURL,
    async (req, res, next) => {
     // validate req.body
    const { name, artist, album, time, is_favorite } = req.body;
    if (!name || !artist || !album || !time || !is_favorite) {
        return res
          .status(422)
          .json({ error: "body requires name, artist, album, time, and is_favorite" });
      }
  
      next();
    },
    async (req, res) => {
      const { name, artist, album, time, is_favorite } = req.body;
      
    const newSong = await createSong({
        name,
        artist,
        album,
        time,
        is_favorite,
      });
    if (!newSong.error) {
        res.status(201).json(newSong);
    } else {
        res.status(500).json({error: "server error"});
    }
});

// Update
songs.put('/:id', validateURL, async (req, res) => {
    const { id } = req.params;
    const song = req.body;
    const updatedSong = await updateSong(id, song);
    console.log(updatedSong);
    if (updatedSong.id) {
        res.status(200).json(updatedSong);
    } else {
        res.status(404).json("Song not found");
    }
});
    

// Delete
songs.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    console.log(deletedSong);
    if (deletedSong.id){
        res.status(201).json(deletedSong)
    } else {
        res.status(404).json("Song not found")
    }
});


module.exports = songs;