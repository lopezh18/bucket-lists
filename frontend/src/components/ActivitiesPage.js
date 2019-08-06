import React, { Component } from 'react'

class ActivitiesPage extends Component {
  constructor(props){
    super(props)
    this.state={
      activity: null
    }
  }
  
  render() {
    let randomActivity = () => {
      let { activities }  = this.props
      let idx = Math.floor(Math.random() * activities.length)
      this.setState({activity: activities[idx].activity_name})
    }

    const { activities } = this.props
    const completeActivities = activities.filter(activity => activity.status === true);
    const incompleteActivities = activities.filter(activity => activity.status === false);
    return (
      <div>
        <h4>Things you want to do: </h4>
        {/* <ActivitiesList activities={ incompleteActivities }/> */}
        <button onClick={ randomActivity }>Random Activity</button>
        <p>{ this.state.activity }</p>

        <h4>Things you have done: </h4>
        {/* <ActivitiesList activities={ completeActivities } /> */}

      </div>
    )
  }
}

export default ActivitiesPage
