import React, { Component } from 'react'
import '../components/stylesheets/item-card.css'
import BucketListApi from '../BucketListApi';

class ItemCard extends Component {
  changeStatus = async (evt, itemId, status, type) => {
    let apiType;
    switch(type){
      case 'activity':
        apiType = 'activities'
        break;
      case 'location':
        apiType='locations'
        break;
      case 'site':
        apiType='sites'
        break;
      default:
        break;
    }
    await BucketListApi.patchUserData(apiType, itemId, !status)
    this.props.submitPatch(type)
  }

  render() {
    let smallDetails;
    let filtered;
    let line;
    const { content, details, id, type, status } = this.props

    if (details) {
      switch (type) {
        case 'activity':
          line = <hr />
          smallDetails =
            <small> {details} </small>
          break;
        case 'site':
          line = <hr />
          smallDetails = <small> {details} </small>
          break;
        case 'location':
          filtered = details.filter(detail => detail.location_id === id)
          if(filtered.length){
            line = <hr/>
          }
          smallDetails = filtered.map(item =>
            <li key={item.id}>
              <small>{item.site_name || item.activity_name}</small>
            </li>
          )
          break;
        default:
          break;
      }
    }

    return (
      <div className='sub-card mb-2' onClick = {(e) => this.changeStatus(e, id, status, type)}>
        <h6 className='mb-0 p-0'>{content}</h6>
        {line}
        <ul className='location-items'>
          {smallDetails}
        </ul>
      </div>
    )
  }
}

export default ItemCard;
