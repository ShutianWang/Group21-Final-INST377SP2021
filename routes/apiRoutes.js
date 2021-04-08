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
    const albums = await db.albumInfo.findAll();
    //const reply = albums.length > 0 ? { data: albums } : { message: 'no results found' };
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/albums/:album_id', async (req, res) => {
  try {
    const album = await db.albumInfo.findAll({
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

// router.post('/dining', async (req, res) => {
//   const halls = await db.DiningHall.findAll();
//   const currentId = (await halls.length) + 1;
//   try {
//     const newDining = await db.DiningHall.create({
//       hall_id: currentId,
//       hall_name: req.body.hall_name,
//       hall_address: req.body.hall_address,
//       hall_lat: req.body.hall_lat,
//       hall_long: req.body.hall_long
//     });
//     res.json(newDining);
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

// router.delete('/dining/:hall_id', async (req, res) => {
//   try {
//     await db.DiningHall.destroy({
//       where: {
//         hall_id: req.params.hall_id
//       }
//     });
//     res.send('Successfully Deleted');
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

// router.put('/dining', async (req, res) => {
//   try {
//     await db.DiningHall.update(
//       {
//         hall_name: req.body.hall_name,
//         hall_location: req.body.hall_location
//       },
//       {
//         where: {
//           hall_id: req.body.hall_id
//         }
//       }
//     );
//     res.send('Successfully Updated');
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

/// /////////////////////////////////
/// ////////artist Endpoints//////////
/// /////////////////////////////////
router.get('/artist', async (req, res) => {
  try {
    const artists = await db.artist.findAll();
    res.json(artists);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/artist/:artist_id', async (req, res) => {
  try {
    const artists = await db.artist.findAll({
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

// router.put('/meals', async (req, res) => {
//   try {
//     await db.Meals.update(
//       {
//         meal_name: req.body.meal_name,
//         meal_category: req.body.meal_category
//       },
//       {
//         where: {
//           meal_id: req.body.meal_id
//         }
//       }
//     );
//     res.send('Meal Successfully Updated');
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

/// /////////////////////////////////
/// ////////charting info Endpoints/////////
/// /////////////////////////////////
router.get('/charting', async (req, res) => {
  try {
    const charting = await db.charting_info.findAll();
    res.send(charting);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/charting/:charting_id', async (req, res) => {
  try {
    const charting = await db.charting_info.findAll({
      where: {
        charting_id: req.params.charting_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

// router.put('/macros', async (req, res) => {
//   try {
//     // N.B. - this is a good example of where to use code validation to confirm objects
//     await db.Macros.update(
//       {
//         meal_name: req.body.meal_name,
//         meal_category: req.body.meal_category,
//         calories: req.body.calories,
//         serving_size: req.body.serving_size,
//         cholesterol: req.body.cholesterol,
//         sodium: req.body.sodium,
//         carbs: req.body.carbs,
//         protein: req.body.protein,
//         fat: req.body.fat
//       },
//       {
//         where: {
//           meal_id: req.body.meal_id
//         }
//       }
//     );
//     res.send('Successfully Updated');
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

/// /////////////////////////////////
/// ////////Songs Endpoints//////////
/// /////////////////////////////////
router.get('/songs', async (req, res) => {
  try {
    const songs = await db.songs.findAll();
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/songs:song_id', async (req, res) => {
  try {
    const songs = await db.songs.findAll({
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
router.get('/genre', async (req, res) => {
  try {
    const genres = await db.genre.findAll();
    res.json(genres);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/genres:song_id', async (req, res) => {
  try {
    const genres = await db.genre.findAll({
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
// /// //////////////////////////////////
// /// ///////Custom SQL Endpoint////////
// /// /////////////////////////////////
// const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
// router.get('/table/data', async (req, res) => {
//   try {
//     const result = await db.sequelizeDB.query(macrosCustom, {
//       type: sequelize.QueryTypes.SELECT
//     });
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

// const mealMapCustom = `SELECT hall_name,
//   hall_address,
//   hall_lat,
//   hall_long,
//   meal_name
// FROM
//   Meals m
// INNER JOIN Meals_Locations ml 
//   ON m.meal_id = ml.meal_id
// INNER JOIN Dining_Hall d
// ON d.hall_id = ml.hall_id;`;
// router.get('/map/data', async (req, res) => {
//   try {
//     const result = await db.sequelizeDB.query(mealMapCustom, {
//       type: sequelize.QueryTypes.SELECT
//     });
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });
// router.get('/custom', async (req, res) => {
//   try {
//     const result = await db.sequelizeDB.query(req.body.query, {
//       type: sequelize.QueryTypes.SELECT
//     });
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

export default router;
