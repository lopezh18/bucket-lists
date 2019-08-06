const express = require("express");
const app = express();
const loginRouter = require('./routes/login');
const userRouter = require('./routes/users');
const locationRouter = require('./routes/locations');
const activityRouter = require('./routes/activities');
const siteRouter = require('./routes/sites');
const cors = require('cors');

app.use(cors());


//morgan - logging system
const morgan = require("morgan");


app.use(express.json());
app.use(morgan("tiny"));

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/locations', locationRouter);
app.use('/activities', activityRouter);
app.use('/sites', siteRouter);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;