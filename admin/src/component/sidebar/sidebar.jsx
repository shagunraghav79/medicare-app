import React from "react";
import "./sidebar.css";
import { IoAddOutline } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";



const Sidebar = () => {
  return (
   <>
     <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <IoAddOutline />
          <p>ADD  ITEMS</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <IoMdRemove />
          <p>LIST</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <IoBagCheckOutline />
          <p>ORDERS</p>
        </NavLink>
      </div>
     </div> 
   </>

    ); 
};

export default Sidebar;