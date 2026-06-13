import React from "react";
import "./navbar.css";
import { RiAdminLine } from "react-icons/ri";

const Navbar = () => {
    return (
        <>
             <div className="navbar">
                <div className="logo">
                    <h2>Medicare</h2>
            
                </div>
                <div className="admin-image">
                    
                   <RiAdminLine />
                </div>

             </div>
        </>
    );
}; 

export default Navbar;