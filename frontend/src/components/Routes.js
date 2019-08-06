import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BucketList from './BucketList';
import ActivitiesPage from './ActivitiesPage';
import LocationsPage from './LocationsPage';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import LoadingPage from './LoadingPage';

class Routes extends Component {

  render() {
    const { formSubmission, activities, locations, user, sites, submitPatch, loading } = this.props
    console.log(loading)

    const privateRoutes = (
      <Switch>
        <Route exact path='/locations' render={() => <LocationsPage locations={locations} />} />
        <Route exact path='/activities' render={() => <ActivitiesPage activities={activities} />} />
      </Switch>
    )

    const loadedMaterial = (
      <Switch>
        <Route exact path='/' render={(rtProps) => <BucketList
          {...rtProps}
          submitPatch={submitPatch}
          formSubmit={formSubmission}
          activities={activities}
          locations={locations}
          sites={sites}
          user={user}
          loading={loading} />} />
        <Route exact path='/login' render={(rtProps) => <LoginForm
          handleLogin={this.props.login} {...rtProps} />} />
        <Route exact path='/signup' render={(rtProps) => <SignUpForm
          handleLogin={this.props.login} {...rtProps} />} />
      </Switch>
    )

    // const loadingPage = (
    //   <Switch>
    //     <Route exact path='/loading' render={() => <LoadingPage />} />
    //   </Switch>
    // )

    return (
      <Switch>
        <Route exact path='/' render={(rtProps) => <BucketList
          {...rtProps}
          submitPatch={submitPatch}
          formSubmit={formSubmission}
          activities={activities}
          locations={locations}
          sites={sites}
          user={user}
          loading={loading} />} />
        <Route exact path='/login' render={(rtProps) => <LoginForm
          handleLogin={this.props.login} {...rtProps} />} />
        <Route exact path='/signup' render={(rtProps) => <SignUpForm
          handleLogin={this.props.login} {...rtProps} />} />
        {user.loggedIn ? privateRoutes : null}
        <Redirect to='/login' />
      </Switch>
    )
  }
}

export default Routes;