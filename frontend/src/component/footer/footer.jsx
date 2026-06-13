import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-box">
          <h2>💊 MedStore</h2>
          <p>Your trusted online medicine store for quick and safe access to medicines.</p>
        </div>

        {/* Middle Section */}
        <div className="footer-box">
          <h3>Quick Links</h3> 
          <ul>
            <li>Home</li>
            <li>Medicines</li>
            <li>Cart</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-box">
          <h3>Contact</h3>
          <p>Email: support@medstore.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
      </div>

    </footer>
  );
};

export default Footer;