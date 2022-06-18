import React, { useState } from 'react'
import "./navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { Link } from "react-router-dom";

const NavBar = () => {

  const [menu, setMenu] = useState('-70vw')

  const toggle = () => {
    setMenu((menu == 0) ? '-70vw' : '0');

  }
  const k = () => {
    setMenu('-70vw')
  }
  return (<div className='navbar-container'>
    <div className='menu' style={{ 'left': menu }} >
      <div className='close-menu' onClick={k}><CloseOutlinedIcon sx={{ fontSize: 30 }} /></div>
      <p className='logo'>Nickel & Dime</p>
      <ul className='menu-list'>
        <li><Link to="/">Home</Link></li>

        <li><Link to="/analytics">Analytics</Link></li>

        <li>Investments</li>
        <li><Link to="/monthlybills">Monthly Bills</Link></li>

      </ul>

     <div>
       
        <Link to="/login"><p className='menu-bottom'>Logout      <LogoutIcon style={{ 'paddingLeft': 10 }} /></p></Link>
       </div>
    </div>

    <div className='navbar'>
      <span onClick={toggle} className='hamburger'><MenuIcon style={{ color: "#D9D9D9" }} /></span>
      <p>User name</p>
      <AccountCircleIcon style={{ color: "#D9D9D9" }} />
    </div>
  </div>
  )
}

export default NavBar
