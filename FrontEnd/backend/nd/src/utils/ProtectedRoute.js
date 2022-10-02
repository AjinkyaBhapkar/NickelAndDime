import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        await axios.get('http://localhost:5000/users/')
            .then(res => {
                res.data.map(u => {
                    setUsers(prev => [...prev, u.username])
                })
            }
            );
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    return<>{
        (useSelector(s => s.user.username) === '')?
        
        <Navigate to='/login' />:children
    }
    
    </>
        
    








}

export default ProtectedRoute
