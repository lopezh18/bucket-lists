const jsonschema = require('jsonschema');
const userSchema = require('../schemas/userSchema.json');
const locationSchema = require('../schemas/locationSchema.json');
const locationPatchSchema = require('../schemas/locationPatchSchema.json');
const activityPatchSchema = require('../schemas/activityPatchSchema.json');
const sitePatchSchema = require('../schemas/sitePatchSchema.json');
const activitySchema = require('../schemas/activitySchema.json');
const siteSchema = require('../schemas/siteSchema.json');
const ExpressError = require('../helpers/expressError');

function validateUserPost(req, res, next){
  const result = jsonschema.validate(req.body, userSchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function validateLocationPost(req, res, next){
  const result = jsonschema.validate(req.body, locationSchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function validateLocationPatch(req, res, next){
  const result = jsonschema.validate(req.body, locationPatchSchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function validateActivityPost(req, res, next){
  const result = jsonschema.validate(req.body, activitySchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function validateActivityPatch(req, res, next){
  const result = jsonschema.validate(req.body, activityPatchSchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function validateSitePost(req, res, next){
  const result = jsonschema.validate(req.body, siteSchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function validateSitePatch(req, res, next){
  const result = jsonschema.validate(req.body, sitePatchSchema);

  if(!result.valid){
    let listOfErrors = result.errors.map(err => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

module.exports = {
  validateUserPost, 
  validateLocationPost, 
  validateActivityPost, 
  validateLocationPatch, 
  validateActivityPatch, 
  validateSitePatch, 
  validateSitePost
};