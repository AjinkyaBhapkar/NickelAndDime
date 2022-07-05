import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import{Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
// let u=useSelector(s=>s.user.username)

// if(u===""){<Navigate to='/login'/>}
return <>{(useSelector(s=>s.user.username) ==='')?
 <Navigate to='/login'/>:
children}</>
}

export default ProtectedRoute
