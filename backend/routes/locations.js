const express = require('express');
const router = new express.Router();
const Location = require('../models/location');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/authentication');
const { validateLocationPost, validateLocationPatch } = require('../middleware/validation');

//get top 10 most popular locations
//get to locations/
router.get('/', async function(req, res, next){
  try{
    let locations = await Location.getTopTen();
    return res.json({ locations });
  } catch (e){
    return next(e);
  }
});

//get to locations/:username
router.get('/:username', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let locations = await Location.getUserLocations(req.params.username);
    return res.json( locations );
  } catch(e){
    return next(e);
  }
});

// post to locations/:username
router.post('/:username', validateLocationPost, authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let newLocation = await Location.postUserLocation(req.params.username, req.body);
    return res.json( newLocation );
  } catch(e){
    return next(e);
  }
});

router.patch('/:username', validateLocationPatch, authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let updatedLocation = await Location.patchLocation(req.body);
    return res.json( updatedLocation );
  } catch(e){
    return next(e);
  }
});

module.exports = router;