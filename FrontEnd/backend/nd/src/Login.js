import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginOut } from './features/user/userSlice'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formStyle, setFormStyle] = useState('none');
    const s = () => { setFormStyle('') }
    const l = () => { setFormStyle('none') }
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [unexpectedError,setUnexpectedError]=useState(false)
    const [Users, setUsers] = useState([])

    const passwordRequirements = "Must contain at least one number, one uppercase, one lowercase, one special character(!@#$&*) and at least 8 or more characters";
    const valid = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/
    const submit = (e) => {
        e.preventDefault();
        const credentials = {
            'username': userName,
            'password': password
        }
        axios.post(`http://localhost:5000/users/${(formStyle === 'none') ? 'login' : 'add'}`, credentials)
            .then(res => {
                //on login submit 
                if (formStyle === 'none') {
                    if (res.status === 200) {
                        dispatch(loginOut(res.data[0].username))
                        navigate('/', { state: res.data[0].username, replace: true })
                        // console.log(res)
                    }
                }
                //on regestration submit
                if (formStyle === '') {
                    if (res.status === 201) {
                        alert('Registration Successful!!')
                        setFormStyle('none')
                    }
                }
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401 || err.response.status === 404) {
                    setErrMsg(err.response.data)
               }else {
                setUnexpectedError(true)
               }
            })
    }
    let AlUsers = []
    const allUsers = async () => {
        await axios.get(`http://localhost:5000/users`)
            .then(res => {
                AlUsers = res.data.map(d => d.username)
                setUsers(AlUsers)
            })
    }
    useEffect(() => {
        allUsers();
        setUserName('')
        setPassword('')
        setConfirm('')

        // eslint-disable-next-line
    }, [formStyle])

    return (
        <div className='login-container'>
            <div className="login">
                <p className={`unexpected-error-msg ${unexpectedError? '':'err'}`}>Something went wrong. Try again</p>
                <h1 id='logo'>Nickel & Dime</h1>
                <div className='btn-flex'>
                    <button className={`btn ${(formStyle === 'none') ? 'selected' : ''}`} onClick={l}  >Login</button>
                    <button className={`btn ${(formStyle === '') ? 'selected' : ''} `} onClick={s} >SignUp</button>

                </div>
                <form className='form'>
                    <input className='form-input' type="text" placeholder='Username' value={userName} onChange={e => setUserName(e.target.value)} />
                    {
                        (Users.includes(userName) && formStyle === '') ? <p className='warnings'>{userName} not available</p> : ''
                    }
                    <input className='form-input' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    {
                        (!(valid.test(password)) && password !== '' && formStyle === '') ? <p className='warnings'>{passwordRequirements}</p> : ''
                    }
                    <input className='form-input' style={{ display: formStyle }} type="text" placeholder='Confirm Password' value={confirm} onChange={e => setConfirm(e.target.value)} />
                    {
                        (password !== '' && confirm !== '' && password !== confirm) ? <p className='warnings'>Passwords should match</p> : ''
                    }

                    {((password === confirm || formStyle === 'none') && userName !== '' && password !== '') ?
                        <input className='form-input' id='submit-btn' type="submit" value='->' onClick={e => submit(e)} /> :
                        <input className='form-input' id='submit-btn' type="submit" value='->' onClick={e => submit(e)} disabled />}

                <p className='red'>{errMsg}</p>
                </form>
            </div>
        </div>
    );
}
export default Login;