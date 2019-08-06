const db = require('../db');

class Location {
  static async getTopTen() {
    const locationQuery = await db.query(`
    SELECT location_name
    FROM locations
    GROUP BY location_name
    ORDER BY COUNT(*) DESC
    LIMIT 10    
    `);

    return locationQuery.rows;
  }

  static async getUserLocations(username) {
    const locationsToSeeQuery = await db.query(`
    SELECT id, location_name, status
    FROM locations
    WHERE username=$1 AND status=false
    `, [username]);

    const locationsSeenQuery = await db.query(`
    SELECT id, location_name, status
    FROM locations
    WHERE username=$1 AND status=true
    `, [username]);

    return { toGo: locationsToSeeQuery.rows, been: locationsSeenQuery.rows };
  }

  static async postUserLocation(username, data) {
    const { location } = data;

    const locationQuery = await db.query(`
    INSERT INTO locations (location_name, username)
    VALUES($1, $2)
    RETURNING id, location_name, status
    `, [location, username]);

    return locationQuery.rows[0];
  }

  static async patchLocation(data) {
    const { status, id } = data;
    const locationQuery = await db.query(`
    UPDATE locations
    SET status=$1
    WHERE id=$2
    RETURNING id, location_name, status
    `, [status, id]);

    return locationQuery.rows[0];
  }
}

module.exports = Location;