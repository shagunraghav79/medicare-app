import './nav.css'
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useContext } from 'react';
import { CartContext } from "../../component/context/CartContext";




function Nav() {

  const{token,setToken}=useContext(CartContext)
     
   const navigate=useNavigate();

  const logout=()=>{
   localStorage.removeItem("token");
   localStorage.removeItem("userId");
   setToken("");
   navigate("/");
   
  }

  return (
    <>

      <div>
        <div className="navbar">
          <div className="logo"> <p>MediCare</p></div>
          <div className="nav-detail">
            <div className="nav-search">
              <input type="text" placeholder='Search for medicines...' />
              <IoSearch className="search-icon" />
            </div>

            <div className="location">
              <FaLocationDot className="loc-icon" />
              <p>Location</p>
            </div>

            <div className="Cart">
              <Link to="/cart">
                <FaShoppingCart className="cart-icon" />

              </Link>

            </div>
            
            <div className="profile">
              <MdAccountCircle className="icon2" />
              <p>Profile</p>
              <ul className='nav-profile-dropdown'>
                <li  onClick={()=>navigate("/myOrders")}>
                  <FiShoppingBag />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <RiLogoutBoxLine />
                  <p>Log Out</p>
                </li>
              </ul>
            </div>
           
          </div>

        </div>


 

      </div>

    </>
  )
}

export default Nav