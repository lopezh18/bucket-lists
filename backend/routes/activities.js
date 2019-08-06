const express = require('express');
const router = new express.Router();
const Activity = require('../models/activity');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/authentication');
const { validateActivityPost, validateActivityPatch } = require('../middleware/validation');

//get top 10 most popular locations
//get to activities/
router.get('/', async function(req, res, next){
  try{
    let activities = await Activity.getTopTen();
    return res.json({ activities });
  } catch (e){
    return next(e);
  }
});


//get to activities/:username
router.get('/:username', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let activities = await Activity.getUserActivities(req.params.username);

    return res.json( activities );
  } catch(e){
    return next(e);
  }
});

// post to activities/:username
router.post('/:username', validateActivityPost, authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let newActivity = await Activity.postUserActivity(req.params.username, req.body);
    return res.json( newActivity );
  } catch(e){
    return next(e);
  }
});

router.patch('/:username', validateActivityPatch, authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let updatedActivity = await Activity.patchActivity(req.body);
    return res.json( updatedActivity );
  } catch(e){
    return next(e);
  }
});

module.exports = router;