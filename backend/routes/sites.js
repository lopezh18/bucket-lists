const express = require('express');
const router = new express.Router();
const Site = require('../models/site');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/authentication');
const { validateSitePost, validateSitePatch } = require('../middleware/validation');

//get top 10 most popular sites
//get to sites/
router.get('/', async function(req, res, next){
  try{
    let sites = await Site.getTopTen();
    return res.json({ sites });
  } catch (e){
    return next(e);
  }
});

//get to sites/:username
router.get('/:username', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let sites = await Site.getUserSites(req.params.username);
    return res.json( sites );
  } catch(e){
    return next(e);
  }
});

// post to sites/:username
router.post('/:username', validateSitePost, authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let newSite = await Site.postUserSite(req.params.username, req.body);
    return res.json( newSite );
  } catch(e){
    return next(e);
  }
});

router.patch('/:username', validateSitePatch, authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let updatedSite = await Site.patchSite(req.body);
    return res.json( updatedSite );
  } catch(e){
    return next(e);
  }
});

module.exports = router;