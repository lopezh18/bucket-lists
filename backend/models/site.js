const db = require('../db');

class Site {
  static async getTopTen(){
    const siteQuery = await db.query(`
    SELECT site_name
    FROM sites
    GROUP BY site_name
    ORDER BY COUNT(*) DESC
    LIMIT 10    
    `);

    return siteQuery.rows;
  }

  static async getUserSites(username){
    const sitesToSeeQuery = await db.query(`
    SELECT s.id, s.site_name, s.location_id, l.location_name, s.status
    FROM sites s
   	LEFT JOIN locations l ON s.location_id = l.id
   	WHERE s.username = $1 and s.status = false
   	order by l.id
    `, [username]);
  

    // SELECT id, site_name, location_id, status
    // FROM sites
    // WHERE username=$1 AND status=false
    const sitesSeenQuery = await db.query(`
    SELECT s.id, s.site_name, s.location_id, l.location_name, s.status
    FROM sites s
   	LEFT JOIN locations l ON s.location_id = l.id
   	WHERE s.username = $1 and s.status = true
   	order by l.id
    `, [username]);
    
    return {toSee: sitesToSeeQuery.rows, seen: sitesSeenQuery.rows};
  }

  static async postUserSite(username, data){
    const { site } = data;
    let locationId;
    let siteQuery;

    if(data.locationId){
      locationId = data.locationId;
      siteQuery = await db.query(`
      INSERT INTO sites (site_name, location_id, username)
      VALUES($1, $2, $3)
      RETURNING id, site_name, location_id, status
      `, [site, locationId, username]);
    } else {
      siteQuery = await db.query(`
      INSERT INTO sites (site_name, username)
      VALUES($1, $2)
      RETURNING id, site_name, location_id, status
      `, [site, username]);
    }

    return siteQuery.rows[0];
  }

  static async patchSite(data){
    const {status, id} = data;
    const siteQuery = await db.query(`
    UPDATE sites
    SET status=$1
    WHERE id=$2
    RETURNING id, site_name, status
    `,[status, id]);

    return siteQuery.rows[0];
  }
}

module.exports = Site;