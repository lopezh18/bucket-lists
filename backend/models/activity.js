const db = require('../db');

class Activity {
  static async getTopTen(){
    const activityQuery = await db.query(`
    SELECT activity_name
    FROM activities
    GROUP BY activity_name
    ORDER BY COUNT(*) DESC
    LIMIT 10    
    `);

    return activityQuery.rows;
  }

  static async getUserActivities(username){
    const activitiesToDoQuery = await db.query(`
    SELECT a.id, a.activity_name, a.location_id, l.location_name, a.status
    FROM activities a
   	LEFT JOIN locations l ON a.location_id = l.id
   	WHERE a.username = $1 and a.status = false
   	order by l.id
    `, [username]);
   
    const activitiesDoneQuery = await db.query(`
    SELECT a.id, a.activity_name, a.location_id, l.location_name, a.status
    FROM activities a
   	LEFT JOIN locations l ON a.location_id = l.id
   	WHERE a.username = $1 and a.status = true
   	order by l.id
    `, [username]);
    
    return {toDo: activitiesToDoQuery.rows, done: activitiesDoneQuery.rows};
  }

  static async postUserActivity(username, data){
    const { activity } = data;
    let locationId;
    let activityQuery;

    if(data.locationId){
      locationId = data.locationId;
      activityQuery = await db.query(`
      INSERT INTO activities (activity_name, location_id, username)
      VALUES($1, $2, $3)
      RETURNING id, activity_name, location_id, status
      `, [activity, locationId, username]);
    } else {
      activityQuery = await db.query(`
      INSERT INTO activities (activity_name, username)
      VALUES($1, $2)
      RETURNING id, activity_name, status
      `, [activity, username]);
    }
    
    return activityQuery.rows[0];
  }
  
  static async patchActivity(data){
    const {status, id} = data;
    const activityQuery = await db.query(`
    UPDATE activities
    SET status=$1
    WHERE id=$2
    RETURNING id, activity_name, status
    `,[status, id]);

    return activityQuery.rows[0];
  }
}

module.exports = Activity;