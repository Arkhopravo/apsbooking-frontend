import React,{useContext} from 'react'
import './Navbar.css'
import { AuthContext } from "../../context/AuthContext";

import { Link } from 'react-router-dom'
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const logout = () => {
        
    let userData = localStorage.getItem("user", user)
    console.log(userData)
    localStorage.removeItem("user")
    setInterval(() => {
      // alert("User logged out");
      window.location.reload();
    }, 1000);
        
  }

  return (
    <div className='navbar'>

        <div className="navContainer">
          <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
            <span className='logo'>APSBooking</span>
          </Link>
          {user ? <div>
             <p>{user.username}</p>
             <button onClick={logout}>Logout</button>
          </div> : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
        </div>
    </div>
  )
}

export default Navbar