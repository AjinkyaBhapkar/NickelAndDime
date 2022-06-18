import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from './NavBar';
import './analytics.css'

const Analytics = () => {
    const [ta, setTa] = useState([])

    useEffect(() => {
        retriveTags('food')
    }, [])
    const retriveTags = (tags) => {
        axios.get(`http://localhost:5000/transactions/tags/${tags}`)
            .then(all => {

                setTa(all.data);

            })
            .catch(err => console.log(err))
    }

    const food = () => { retriveTags('food'); setTags('Food') }
    const fuel = () => { retriveTags('fuel'); setTags('Fuel') }

    const clubbing = () => { retriveTags('clubbing'); setTags('Clubbing') }
    const bill = () => { retriveTags('bill'); setTags('Bills') }
    let total = 0;

    const [tag, setTags] = useState('Food')
    let customTag = ''
    const handle = e => {

        customTag = e.target.value

        console.log(customTag)

    }

    const submit = e => {
        e.preventDefault();
        retriveTags(customTag)
        setTags(customTag)
    }
    return (
        <>
            <NavBar />
            <div>
                <div className='btns'>

                    <button onClick={food} >Food</button>
                    <button onClick={fuel}>Fuel</button>

                    <button onClick={clubbing}>Clubbing</button>
                    <button onClick={bill}>Bills</button>
                </div>
                <div className='form-container'>
                    <form >
                        <input type="text" onChange={(e) => handle(e)} placeholder='Search transactions by tag' />
                        <input className='submit-btn' type="submit" onClick={submit} />
                    </form>
                </div>
                <div className='analytics-mains'>
                    <div className='transactions'>
                        {
                            console.log(ta.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0)))
                        }
                        <h3>Transactions with <i>"{tag}"</i>  tag</h3>
                        {
                            ta.map(all => {

                                total = total + all.amount;
                                return (
                                    <div className='transaction'>
                                        <p >{all.date.slice(0, 10)}</p>
                                        <p>{(((all.description).length) > 15) ? (all.description.slice(0, 15)) + '..' : (all.description)}</p>
                                        <p className={(all.type == 'credit') ? 'green' : "red"}>{all.amount} </p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <h3 className='total' ><i>"{tag}"</i> Total : {total}</h3>


            </div>
        </>

    )
}

export default Analytics
