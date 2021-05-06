/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to our billboards db API!');
});

/// /////////////////////////////////
/// ////Album Info Hall Endpoints////////
/// /////////////////////////////////
router.get('/albums', async (req, res) => {
  try {
    const albums = await db.album_info.findAll();
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/albums/:album_id', async (req, res) => {
  try {
    const album = await db.album_info.findAll({
      where: {
        album_id: req.params.album_id
      }
    });

    res.json(album);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});


/// /////////////////////////////////
/// ////////artist Endpoints//////////
/// /////////////////////////////////
router.get('/artist', async (req, res) => {
  try {
    const artists = await db.Artists.findAll();
    res.json(artists);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/artist/:artist_id', async (req, res) => {
  try {
    const artists = await db.Artists.findAll({
      where: {
        artist_id: req.params.artist_id
      }
    });
    res.json(artists);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/artist', async (req, res) => {
  const artists = await db.Artists.findAll();
  const currentId = (await artists.length) + 1;
  try {
    const newArtist = await db.Artists.create({
      artist_id: currentId,
      artist_name: req.body.artist_name,
      artist_label: req.body.artist_label
    });
    res.json(newArtist);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/artist', async (req, res) => {
  try {
    await db.Artists.update(
      {
        artist_name: req.body.artist_name,
        artist_label: req.body.artist_label
      },
      {
        where: {
          artist_id: req.body.artist_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/artist/:artist_id', async (req, res) => {
  try {
    await db.Artists.destroy({
      where: {
        artist_id: req.params.artist_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});




/// /////////////////////////////////
/// ////////charting info Endpoints/////////
/// /////////////////////////////////
router.get('/charting', async (req, res) => {
  try {
    const charting_info = await db.Charting.findAll();
    res.send(charting_info);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/charting/:charting_id', async (req, res) => {
  try {
    const charting_info = await db.Charting.findAll({
      where: {
        charting_id: req.params.charting_id
      }
    });
    res.json(charting_info);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});



/// /////////////////////////////////
/// ////////Songs Endpoints//////////
/// /////////////////////////////////
router.get('/songs', async (req, res) => {
  try {
    const songs = await db.Songs.findAll();
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/songs:song_id', async (req, res) => {
  try {
    const songs = await db.Songs.findAll({
      where: {
        song_id: req.params.song_id
      }
    });
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});



//////////////////////////////////////
// ///////////Genre Endpoints/////////
//////////////////////////////////////
router.get('/genres', async (req, res) => {
  try {
    const genres = await db.Genres.findAll();
    res.json(genres);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/genres:song_id', async (req, res) => {
  try {
    const genres = await db.Genres.findAll({
      where: {
        song_id: req.params.song_id
      }
    });
    res.json(genres);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});


export default router;
