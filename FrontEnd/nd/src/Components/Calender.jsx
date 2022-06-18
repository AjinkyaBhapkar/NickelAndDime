import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import axios from "axios";
import './calender.css'
import { useSelector } from 'react-redux'


const Calender=()=> {
  const[empty,setEmpty]=React.useState('none')
  const [value, setValue] = React.useState(new Date());
const [tranxs,setTranxs]=React.useState([])
let username=useSelector(s=>s.user.username)
function  retriveDay(date){
  axios.get(`http://localhost:5000/transactions/date/${username}/${date}`)
  .then(resp=>{
    setTranxs(resp.data)
    if(resp.data.length==0){setEmpty('')}
    else{setEmpty('none')}
  })
  .catch(err=>console.log(err))
}
const [day,setDay]=React.useState('')
const[visible,setVisible]=React.useState('none')
const h=()=>setVisible('none')
  return (
  <>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          
           let day=newValue.getFullYear()+'-'+(String(newValue.getMonth()+1).padStart(2,0))+'-'+String(newValue.getDate()).padStart(2,0);
           setDay(`${String(newValue).slice(0,16)}`)
          retriveDay(day);
          setVisible('')
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    <div className={`day-transactions-container ${visible}`} >
      <div className="day-transactions">
        <h3>{day}</h3>
          <p className={empty}>No Transactions on the day</p>
        <ul>

          
        {
          tranxs.map(a=>{
              
            
              
            return(
              <li key={a._id}>
                <div className="day-transactions-transaction">
                  <p>{a.description}</p>
                  <p1 className={(a.type=='credit')?"green":"red"}>{a.amount}</p1>
                </div>
              </li>
            )
          })
        }
        </ul>
        <button onClick={h} className="back-btn">Back</button>
      </div>
    </div>
  </>
  );
}

export default Calender
