
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './allTransactions.css'
import AddTransation from './AddTransation'
import { useSelector,useDispatch } from 'react-redux'
import { fill } from '../features/form/formSlice';


const AllTransactions = () => {
  const dispatch = useDispatch()
  const [fu, setFu] = useState([])
  let Months = [0, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  

  let username=useSelector(s=>s.user.username);
  const retriveTransactions = () => {
    axios.get(`http://localhost:5000/transactions/user/${username}`)
      .then(all => {
        // console.log(all.data)
        setFu(all.data);

      })
      .catch(err => console.log(err))
  }



  const [tranx, setTranx] = useState({
    username:'',
    type:'debit',
    date: '2020-03-23T00:00:00.000Z'

  })
  const [pop, setPop] = useState('none')
  const back = () => {
    // console.log('clicked')
    setPop('none');

  }

  const deleteTransaction = () => {
    // console.log(tranx._id)
    axios.delete(`http://localhost:5000/transactions/delete/${username}/${tranx._id}`)
      .then(resp => {
        console.log(resp)
        
        setPop('none')
      })

  }


  useEffect(() => {
    retriveTransactions();
    
  }, [useSelector(s => s.form.edit),pop])
  let k=''
  return (
    <div className='recent-transactions'>
      
      <h2>Recent Transactions </h2>
      <ul>
        {
          console.log(fu.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0)))

        }

        {
          fu.map(({ _id, username, type, amount, description, tags, date }) => {
            const v = () => {
              setPop('show')

              // console.log(_id)
              axios.get(`http://localhost:5000/transactions/transaction/${username}/${_id}`)
                .then(data => {
                  setTranx(data.data[0])

                })
                .catch(err => console.log(err))
            }

            return (

              <li className='transaction' key={_id} >
                <p>{date.slice(8, 10)} {(date.slice(5, 6) == 0) ? Months[date.slice(6, 7)] : Months[date.slice(5, 7)]} '{date.slice(2, 4)}</p>
                <p onClick={v}>{description.slice(0, 18)}{(description.length > 20) ? '..' : ''}</p>

                <p className={(type === 'debit') ? 'red' : 'green'}>{amount}</p>
              </li>

            )
          })
        }
      </ul>
      <div className={`screen ${pop}`}>

        <div className=' transaction-details' >
          {/* {console.log(tranx)} */}
          <div className='transaction-data'>
            <p>Type:{tranx.type}</p>
            <p>Amount:{tranx.amount}</p>
            <p>Description:<br />{tranx.description}</p>
            <p>Tags:{tranx.tags}</p>
            <p>YYYY-MM-DD:<br />{(tranx.date)?.slice(0, 10)}</p>
          </div>
          <div className='transaction-details-btn'>
            <button className='b1' onClick={back}>Back</button>
            <div className='b2-div'>
              <button className='b2'
                onClick={() => {
                  dispatch(fill({
                    _id:`${tranx._id}`,
                    username:`${tranx.username}`,
                    type: `${tranx.type}`,
                    amount: `${tranx.amount}`,
                    description: `${tranx.description}`,
                    tags: `${tranx.tags}`,
                    date: `${String(tranx.date).slice(0,10)}`,
                    edit:'',
                    submit:'none',
                    update:''
                  }))}}
              >Edit</button>
              <button className='b2' onClick={deleteTransaction}>Delete</button>
            </div>
          </div>

        </div>
      </div>
      {

      }

      <AddTransation />



    </div>
  )
}

export default AllTransactions
