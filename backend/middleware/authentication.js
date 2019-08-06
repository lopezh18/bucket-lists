const ExpressError = require('../helpers/expressError');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

function authenticateJWT(req, res, next){
  try{
    const tokenFromBody = req.body._token || req.query._token;

    const payload = jwt.verify(tokenFromBody, SECRET);

    //current user
    req.user = payload;

    return next();
  } catch (e){
    //shouldn't pass anything into next
    return next(e);
  }
}

function ensureLoggedIn(req, res, next){
  try{
    if(!req.user){
      const err = new ExpressError('Login to acess this information', 401);
      return next(err);
    } else {
      return next();
    }
  } catch(e){
    next(e);
  }
}

function ensureCorrectUser(req, res, next){
  try{
    if(req.user.username !== req.params.username){
      const err = new ExpressError('Unauthorized', 401);
      return next(err);
    } else {
      return next();
    }
  } catch(e){
    next(e);
  }
}

module.exports = {
  authenticateJWT, 
  ensureLoggedIn, 
  ensureCorrectUser
};