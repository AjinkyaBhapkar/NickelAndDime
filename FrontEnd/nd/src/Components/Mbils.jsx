import React, { useEffect, useState } from 'react'
import './Mbils.css'
const Mbils = () => {
    const[eb,setEB]=useState("paid");
    const[r,setR]=useState("paid");
    const[mb,setMB]=useState("paid");
    const[ccb,setCCB]=useState("paid");
    const[st,setST]=useState("paid");

    
  return (
    <div>
      <h2>May 2022</h2>
      <div className='list'>
          <p>Electricity Bill <span className={eb}></span></p>
          <p>Rent <span className={r}></span></p>
          <p>Mobile Bill<span className={mb}></span></p>
          <p>Credit Card Bill<span className={ccb}></span></p>
          <p>Satelite TV<span className={st}></span></p>
      </div>
    </div>
  )
}

export default Mbils
