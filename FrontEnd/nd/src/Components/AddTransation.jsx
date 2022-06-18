import axios from 'axios'
import React, { useState } from 'react'
import './addTransaction.css'
const AddTransation = (pr) => {
  const [show, setShow] = useState(pr.pr.display)
  const k = () => { setShow('') }
  const n = e => { e.preventDefault(); setShow('none') }

  const [formdata, setFormData] = useState({

    // username: "Ajinkya",
    // type: "",
    // amount: "",
    // description: "",
    // tags: "",
    // date: ""

    username: pr.pr.username,
    type: pr.pr.type,
    amount: pr.pr.amount,
    description: pr.pr.description,
    tags: pr.pr.tags,
    date: pr.pr.date

  })

  const handle = e => {
    const newData = { ...formdata }
    newData[e.target.id] = e.target.value
    setFormData(newData)
    console.log(newData)

  }

  const submit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/transactions/add', {
      username: formdata.username,
      type: formdata.type,
      amount: formdata.amount,
      description: formdata.description,
      tags: formdata.tags,
      date: formdata.date
    })
      .then(res => {
        console.log(res.data)
      })
  }

  return (<>
    <div className='add-transaction'>
      <button className='add-transaction-btn' onClick={k}>Add transaction</button>
    </div>
    <div className='add-transaction-form-container' style={{ display: show }}  >
      <form className='add-transaction-form'>
        <div className='add-transaction-form-radio'>


          <input onChange={(e) => handle(e)} value={'debit'} type='radio' id='type' name='type'  />
          <label htmlFor="debit" >Debit</label>
          <input onChange={(e) => handle(e)} value={'credit'} type='radio' id='type' name='type' />
          <label htmlFor='credit'>Credit</label>

        </div>

        <input onChange={(e) => handle(e)} value={formdata.amount} type="number" id="amount" placeholder='Amount' />
        <input onChange={(e) => handle(e)} value={formdata.description} type="text" id="description" placeholder='Description' />
        <input onChange={(e) => handle(e)} value={formdata.tags} type="text" id="tags" placeholder='Tags' />
        <input onChange={(e) => handle(e)} value={formdata.date} type="date" id="date" />
        <input type="Submit" onClick={submit} id='add-transaction-form-sbtn' />
        <button id='cancel-btn' onClick={n}>Cancel</button>
      </form>
    </div>
  </>
  )
}

export default AddTransation
