import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'
import NavBar from './components/NavBar'
import BucketListApi from './BucketListApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activities: [],
      locations: [],
      sites: [],
      user: {
        loggedIn: false,
        userLocations: [{ toGo: [] }, { been: [] }],
        userActivities: [{ toDo: [] }, { done: [] }],
        userSites: [{ toSee: [] }, { seen: [] }]
      }
    }
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.userBLData();
      await this.makeApiRequest();
    }
    await this.makeApiRequest();

    this.setState(state => ({
      ...state, 
      loading: false
    }))
  }

  async userBLData() {
    let username = localStorage.getItem('bl-username')
    let userActivities = await BucketListApi.getUserActivities(username);
    let userLocations = await BucketListApi.getUserLocations(username);
    let userSites = await BucketListApi.getUserSites(username);

    if (!userActivities.error || !userLocations.error || !userSites.error) {
      this.setState(state => ({ 
        ...state,
        user: { loggedIn: true, username, userActivities, userLocations, userSites }
      }))
    } else {
      localStorage.clear()
    }
  }

  async makeApiRequest() {
    let locations = await BucketListApi.getTopLocations();
    let activities = await BucketListApi.getTopActivities();
    let sites = await BucketListApi.getTopSites();

    this.setState(state => ({
      ...state,
      locations: locations, activities: activities,
      sites: sites
    }));
  }

  submitItem = (type, item) => {
    if (type === 'activity') {
      this.setState(state => ({
        ...state, activities: [item, ...state.activities]
      }))
    }

    if (type === 'location') {
      this.setState(state => ({
        ...state, locations: [item, ...state.locations]
      }))
    }
  }

  submitPatch = async (type) => {
    let username = localStorage.getItem('bl-username')
    switch (type) {
      case 'location':
        let userLocations = await BucketListApi.getUserLocations(username);
        this.setState(state => ({
          ...state,
          user: {...state.user, userLocations}
        }))
        break;
      case 'activity':
        let userActivities = await BucketListApi.getUserActivities(username);
        this.setState(state => ({
          ...state,
          user: {...state.user, userActivities}
        }))
        break;
      case 'site':
        let userSites = await BucketListApi.getUserSites(username);
        this.setState(state => ({
          ...state,
          user: {...state.user, userSites}
        }))
        break;
      default:
        break;
    }
  }

  updateUser = (status, username = null) => {
    if (status) {
      this.setState(state => ({
        ...state, user: { loggedIn: status, username }
      }))
    } else {
      this.setState(state => ({
        ...state, user: { loggedIn: status }
      }))
    }
  }
  render() {
    return (
      <BrowserRouter>
        <NavBar user={this.state.user} updateUser={this.updateUser} />
        <Routes submitPatch={this.submitPatch} formSubmission={this.submitItem} login={this.updateUser} {...this.state} />
      </BrowserRouter>
    )
  }
}

export default App;
