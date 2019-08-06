import axios from 'axios';

const BASE_URL = 'http://localhost:3001/'

class BucketListApi {
  static async getUserActivities(username) {
    try {
      let res = await axios({
        method: 'get',
        url: `${BASE_URL}activities/${username}`,
        params: { _token: localStorage.getItem('token') }
      })
      return res.data;

    } catch (error) {
      return { error }
    }
  }

  static async getUserSites(username) {
    try {
      let res = await axios({
        method: 'get',
        url: `${BASE_URL}sites/${username}`,
        params: { _token: localStorage.getItem('token') }
      })
      return res.data;

    } catch (error) {
      return { error }
    }
  }

  static async getUserLocations(username) {
    try {
      let res = await axios({
        method: 'get',
        url: `${BASE_URL}locations/${username}`,
        params: { _token: localStorage.getItem('token') }
      })

      return res.data;
    } catch (error) {
      return { error }
    }
  }

  static async patchUserData(type, id, status) {
    try {
      const username = localStorage.getItem('bl-username')
      let res = await axios({
        method: 'patch',
        url: `${BASE_URL}${type}/${username}`,
        data: {
          _token: localStorage.getItem('token'),
          id,
          status
        }
      })
      
      return res.data;
    } catch (error) {
      return { error }
    }
  }

  static async getTopLocations() {
    let res = await axios.get(`${BASE_URL}locations`);
    return res.data.locations;
  }

  static async getTopActivities() {
    let res = await axios.get(`${BASE_URL}activities`);
    return res.data.activities;
  }

  static async getTopSites() {
    let res = await axios.get(`${BASE_URL}sites`);
    return res.data.sites;
  }

  static async loginUser(userObj) {
    try {
      let res = await axios.post(`${BASE_URL}login`, userObj);
      return res.data;
    } catch (error) {
      return { error };
    }
  }

  static async registerUser(userObj) {
    try {
      let res = await axios.post(`${BASE_URL}users`, userObj);
      return res.data;
    } catch (error) {
      return { error }
    }
  }

  static async addActivity(username, activity) {
    let res = await axios({
      method: 'post',
      url: `${BASE_URL}activities/${username}`,
      data: {
        _token: localStorage.getItem('token'),
        activity
      }
    })
    return res.data
  }

  static async addLocation(username, location) {
    let res = await axios({
      method: 'post',
      url: `${BASE_URL}locations/${username}`,
      data: {
        _token: localStorage.getItem('token'),
        location
      }
    })
    return res.data
  }

  static async addSite(username, site) {
    let res = await axios({
      method: 'post',
      url: `${BASE_URL}locations/${username}`,
      data: {
        _token: localStorage.getItem('token'),
        site
      }
    })
    return res.data
  }
}

// let res = await axios({
//   method: 'get',
//   url: `${BASE_URL}locations/${username}`,
//   params: { _token: localStorage.getItem('token') }
// })

export default BucketListApi;