/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3001;
const OPTIONS = {expiresIn: 60*60};

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'jobly-test'
// - else: 'jobly'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "bucket-list-test";
} else {
  DB_URI = process.env.DATABASE_URL || "bucket-list";
}

console.log("Using database", DB_URI);

module.exports = {
  PORT,
  DB_URI, 
  SECRET, 
  OPTIONS
};