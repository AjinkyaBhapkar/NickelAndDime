import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Mbils.css'
const Mbils = () => {
  const [eb, setEB] = useState("not-paid");
  const [r, setR] = useState("not-paid");
  const [mb, setMB] = useState("not-paid");
  const [ccb, setCCB] = useState("not-paid");
  const [st, setST] = useState("not-paid");

  useEffect(() => {
    check('electricity bill',setEB);
    check('rent',setR);
    check('mobile bill',setMB);
    check('credit card bill',setCCB);
    check('satelite tv',setST);
  }, [])

  const check = (rent,Set) => {
    axios.get(`http://localhost:5000/transactions/tags/${rent}`)
      .then(resp => {
        if (resp.data.length == 0) { Set('not-paid') }
        else if (resp.data.length == 1) { Set('paid') }
        else { Set('paid'); alert(`${rent} has been paid more than once!!`) }
      }
      )

  }

  let Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const [month, setMonth] = useState('')
  const title = () => {
    let d = new Date();
    let k = Months[d.getMonth()] + " " + d.getFullYear()
    setMonth(k)
    console.log(d)
  }

  useEffect(() => {
    title();
  })
  return (
    <div className='monthlybills-mains'>
      <h2>{month}</h2>
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
