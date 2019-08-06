import React, { Component } from 'react'
import ItemCard from './ItemCard';
import uuid from 'uuid/v4'

class ContainerCard extends Component {
  render() {
    const { items, completed, header, type, details, submitPatch } = this.props
    let itemsToRender;
    let completedItemsToRender;
    let completedHeader;
    let sectionForCompletedItems;

    switch(type){
      case 'activity':
        completedHeader = 'Done';
        break;
      case 'location':
        completedHeader = 'Visited';
        break;
      case 'site':
        completedHeader = 'Seen';
        break;
      default:
        break;
    }

    if (items) {
      itemsToRender = items.map(item => (
        <ItemCard
          content={item.activity_name || item.site_name || item.location_name}
          key={item.id || uuid()} 
          id = {item.id || uuid()}
          details = {type === 'activity' ||type === 'site' ? item.location_name : details }
          type = { type }
          status={item.status}
          submitPatch={submitPatch}/>
      ))
    }

    if (typeof completed === 'object') {
      if(completed){
        completedItemsToRender = completed.map(item => (
          <ItemCard 
          content = {
            item.activity_name || item.site_name || item.location_name } 
          key = {item.id} 
          id={item.id}
          location={item.location_name } 
          type = { type }
          status = {item.status}
          submitPatch={submitPatch}/>
        ))
      }

      sectionForCompletedItems = (
        <div>
        <h2 className='card-title'><u>  { completedHeader } </u></h2>
        <div className='m-3'>
           { completedItemsToRender }
        </div>
      </div>)
    }

    return (
      <div className={`${type}-img pb-3`}>
        <h2 className='card-title'><u>  {header} </u></h2>
        <div className='m-3'>
          {items.length ? itemsToRender : null}
        </div>
        {localStorage.getItem('token') ? sectionForCompletedItems : null}
      </div>
    )
  }
}

export default ContainerCard;