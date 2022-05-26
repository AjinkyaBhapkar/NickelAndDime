import React, { useState } from 'react'
import './addTransaction.css'
const AddTransation = () => {
  const [show, setShow] = useState('none')
  const k = () => {
    setShow('')
  }
  return (<>
    <div className='add-transaction'>
      <button className='add-transaction-btn' onClick={k}>+</button>
      </div>
    <div className='add-transaction-form-container' style={{ display: show }}>
      <form className='add-transaction-form' action="/">
        <div className='add-transaction-form-radio'>


          <input type='radio' id='debit' name='type' checked />
          <label for="debit" >Debit</label>
          <input type='radio' id='credit' name='type' />
          <label for ='credit'>Credit</label>

        </div>

        <input type="number" id="" placeholder='Amount' />
        <input type="text" id="" placeholder='Description' />
        <input type="text" id="" placeholder='Tags' />
        <input type="Submit" id='add-transaction-form-sbtn' />
      </form>
    </div>
  </>
  )
}

export default AddTransation
