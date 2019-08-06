const db = require('../db');
const ExpressError = require('../helpers/expressError');
const bcrypt = require("bcrypt");


class User {
  static async authenticate(userObj){
    let { username, password } = userObj;
    const userQuery = await db.query(`
    SELECT password FROM users
    WHERE username = $1
    `, [username]);

    const user = userQuery.rows[0];

    if(user){
      if(await bcrypt.compare(password, user.password)){
        return username;
      }
    } 

    throw new ExpressError("Invalid Password", 401);
  }

  static async register(userObj){
    const { username, password, email, firstName, lastName, homeAirport } = userObj;

    const duplicateCheck = await db.query(`
      SELECT username FROM users
      WHERE username = $1
    `, [username]);

    if(duplicateCheck.rows[0]){
      throw new ExpressError(`There already exists a user with username: ${username}`, 409);
    }
    
    const userQuery = await db.query(`
      INSERT INTO users 
        (username, password, email, first_name, last_name, home_airport)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING username, password, email, first_name, last_name
    `, [username, password, email, firstName, lastName, homeAirport]);

    return userQuery.rows[0];
  }

  static async getUser(username){
    const userQuery = await db.query(`
    SELECT username, first_name, last_name, email, home_airport
    FROM users
    WHERE username=$1`, 
    [username]);

    return userQuery.rows[0];
  }
}

module.exports = User;
