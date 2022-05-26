import React from 'react'
import './statusBar.css'
const StatusBar = () => {
    let Total = 10000;
    let Balance=3800;
    let k=  (Balance *90/Total) 
  return (
      <div className='status-bar-all'>
      <div className='status-bar'></div>
      <div className='status' style={{width:k+'vw'}}></div>
      <div className='status-values'><p>{Balance}</p><p>{Total}</p></div>
      </div>
  )
}

export default StatusBar
