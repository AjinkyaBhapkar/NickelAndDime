import axios from 'axios'
import React, { useState } from 'react'
import './addTransaction.css'
import { useSelector, useDispatch } from 'react-redux'
import { fill } from '../features/form/formSlice';
// import{loginOut} from '../features/user/userSlice';

const AddTransation = () => {
  const dispatch = useDispatch()




  let newData = { ...useSelector(s => s.form) }

  const [formdata, setFormData] = useState({

    username: `${useSelector(s => s.user.username)}`,
    type: `${useSelector(s => s.form.type)}`,
    amount: `${useSelector(s => s.form.amount)}`,
    description: `${useSelector(s => s.form.description)}`,
    tags: `${useSelector(s => s.form.tags)}`,
    date: `${useSelector(s => s.form.date)}`



  })

  const handle = e => {
    // const newData = { ...formdata }
    newData[e.target.id] = e.target.value
    setFormData(newData)
    console.log(newData)
    dispatch(fill(newData))
  }
  let username=useSelector(s=>s.user.username);
  const ocAddTransaction = () => {
    newData['edit'] = '';
    newData['username']=`${username}`
    dispatch(fill(newData))
  }

  const ocCancel = e => {
    e.preventDefault();
    newData = {
      username: '',
      type: '',
      amount: '',
      description: '',
      tags: '',
      date: date,
      edit: 'none',
      submit: '',
      update: 'none'
    }
    dispatch(fill(newData))
  }

  const fullDate = new Date()
  const month = String(parseInt(fullDate.getMonth()) + 1).padStart(2, "0")
  const date = fullDate.getFullYear() + '-' + month + '-' + fullDate.getDate()

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
        newData = {
          username: '',
          type: '',
          amount: '',
          description: '',
          tags: '',
          date: date,
          edit: 'none',
          submit: '',
          update: 'none'
        }
        dispatch(fill(newData))
      })
  }
  let id=useSelector(s=>s.form._id)
  const updat =e=>{
    e.preventDefault();
    axios.post(`http://localhost:5000/transactions/update/${id}`,newData)
    .then(res=>{
      console.log(res.data)
        newData = {
          username: '',
          type: '',
          amount: '',
          description: '',
          tags: '',
          date: date,
          edit: 'none',
          submit: '',
          update: 'none'
        }
        dispatch(fill(newData))
    }

    )
  }
  
  
  return (<>
    <div className='add-transaction'>
      <button className='add-transaction-btn' onClick={ocAddTransaction}>Add transaction</button>
    </div>
    <div className='add-transaction-form-container' style={{ display: `${useSelector(s => s.form.edit)}` }}  >
      <form className='add-transaction-form'>
        <div className='add-transaction-form-radio'>


          <input onChange={(e) => handle(e)} value={'debit'} type='radio' id='type' name='type' />
          <label htmlFor="debit"  >Debit</label>
          <input onChange={(e) => handle(e)} value={'credit'} type='radio' id='type' name='type'  />
          <label htmlFor='credit'>Credit</label>

        </div>

        <input onChange={(e) => handle(e)} value={useSelector(s => s.form.amount)} type="number" id="amount" placeholder='Amount' />
        <input onChange={(e) => handle(e)} value={useSelector(s => s.form.description)} type="text" id="description" placeholder='Description' />
        <input onChange={(e) => handle(e)} value={useSelector(s => s.form.tags)} type="text" id="tags" placeholder='Tags' />
        <input onChange={(e) => handle(e)} value={useSelector(s => s.form.date)} type="date" id="date" />
        <input type="Submit" onClick={submit} id='add-transaction-form-sbtn'
          style={{ display: `${useSelector(s => s.form.submit)}` }} />
        <input type="Submit" onClick={updat} id='add-transaction-form-sbtn' value='Update'
          style={{ display: `${useSelector(s => s.form.update)}` }} />
        <button id='cancel-btn' onClick={ocCancel}>Cancel</button>
      </form>
    </div>
  </>
  )
}

export default AddTransation
