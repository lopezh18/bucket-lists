import React, { Component } from 'react'

class LocationsPage extends Component {
  render() {
    const { locations } = this.props
    const completeLocations = locations.filter(location => location.status === true);
    const incompleteLocations = locations.filter(location => location.status === false);
    return (
      <div>
        <h4>Places you want to go: </h4>
        {/* <LocationsList locations={ incompleteLocations }/> */}

        <h4>Places you have been:</h4>
        {/* <LocationsList locations = { completeLocations } /> */}
      </div>
    )
  }
}

export default LocationsPage;