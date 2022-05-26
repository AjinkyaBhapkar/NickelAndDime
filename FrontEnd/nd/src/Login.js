import { useState } from 'react';
import './login.css';

function Login() {

    const[ formStyle,setFormStyle]=useState('none');
    const s=()=>{setFormStyle('')}
    const l=()=>{setFormStyle('none')}
    return (
        <div className="login">
            <h1 id='logo'>Nickel & Dime</h1>
            <div className='btn-flex'>
                <button className='btn' onClick={l}   >Login</button>
                <button className='btn' onClick={s} >SignUp</button>

            </div>
            <form className='form' action="/">
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <input style={{display:formStyle}} type="text" placeholder='Confirm Password' />
                <input id='submit-btn' type="submit" value='->'  />
            </form>
        </div>
    );
}
export default Login;