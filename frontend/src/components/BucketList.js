import React, { Component } from 'react';
import './stylesheets/bucketlist.css'
import image1 from '../images/canyon.jpg'
import image2 from '../images/boat.jpg'
import image3 from '../images/road.jpg'
import ContainerCard from './ContainerCard';

class BucketList extends Component {
  render() {
    let top = 'Your';
    let status = this.props.user.loggedIn
    let images = [image1, image2, image3]
    let randomInt = Math.floor(Math.random() * images.length);
    let styles = {
      backgroundImage: `url(${images[randomInt]})`
    }
    let toDo;
    let toGo;
    let toSee;
    let done;
    let been;
    let seen;
    let home;
    let details;

    const { userActivities, userLocations, userSites } = this.props.user

    const { activities, locations, sites, submitPatch } = this.props
    toDo = userActivities.toDo
    done = userActivities.done
    toGo = userLocations.toGo
    been = userLocations.been
    toSee = userSites.toSee
    seen = userSites.seen

    if (toSee && toDo) {
      details = toSee.concat(toDo)
    }

    if (status) {
      home = (
        <div className='container'>
          <p className='lead'>Click an item to change its status</p>
        </div>
      );
    }

    if (!status) {
      top = 'Top'
      home = (
        <div className='container'>
          <p className="lead about-bl"> Welcome to Bucket List, your go to application for storing everything and everywhere you may want to do, see, and go.</p>

          <button onClick={() => { this.props.history.push("/signup") }} className='btn-primary btn-lg mx-3'>
            Sign Up
            </button>
          <button onClick={() => { this.props.history.push("/login") }} className='btn-primary btn-lg'>
            Login
            </button>
        </div>
      )
    }
    
    return (
      <div className='BucketList'>
        <div className='jumbotron jumbotron-fluid p-0 jumbotron-cover-image' style={styles}>
          <div className='header-text'>
            <h1 className='brand'>
              Bucket List
          </h1>
            {home}
          </div>
        </div>
        <div className='row-container'>
          <div className='row grid-row'>
            <div className='col-sm-auto'>
              <ContainerCard
                header={`${top} Locations`}
                type='location'
                items={status ? toGo : locations}
                details={details}
                completed={status ? been : null}
                submitPatch={submitPatch} />
            </div>
            <div className='col-sm-auto'>
              <ContainerCard
                header={`${top} Activities`}
                type='activity'
                items={status ? toDo : activities}
                completed={status ? done : null}
                submitPatch={submitPatch} />
            </div>
            <div className='col-sm-auto'>
              <ContainerCard
                header={`${top} Sites`}
                type='site'
                items={status ? toSee : sites}
                completed={status ? seen : null} 
                submitPatch={submitPatch}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BucketList;