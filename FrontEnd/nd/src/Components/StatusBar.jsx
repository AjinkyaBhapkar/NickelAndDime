import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './statusBar.css'
import { useSelector } from 'react-redux'


const StatusBar = () => {
  let credit = 0
  let debit = 0
  const [debits, setDebits] = useState([])
  let username = useSelector(s => s.user.username);
  const retriveDebit = () => {
    axios.get(`http://localhost:5000/transactions/type/${username}/debit`)
      .then(resp => {
        setDebits(resp.data)


      })
  }
  const [credits, setCredits] = useState([])
  const retriveCredit = () => {
    axios.get(`http://localhost:5000/transactions/type/${username}/credit`)
      .then(res => {
        setCredits(res.data)

      })
  }


  useEffect(() => {
    retriveCredit();
    retriveDebit();


  }, [useSelector(s => s.form.edit)])



  return (
    <div className='status-bar-all'>
      <div className='status-bar'></div>
      {
        debits.map(d => {
          debit = debit + d.amount
        })

      }
      {
        credits.map(c => {
          credit = credit + c.amount
        })
      }

      <div className='status'
        style={{ width: ((((credit - debit)  / credit) > 0) ? ((credit - debit)  / credit) : 0)*100  + '%' }}

      >

      </div>

      <div className='status-values'><p>{credit - debit}</p><p>{credit}</p></div>
    </div>
  )
}

export default StatusBar
