import React from "react";
import "./Footer.css";

export default function footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-col brand">
          <h2 className="logo">Invest Smart</h2>
          <p className="tagline">Compare better. Invest smarter.</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/help">Help & Support</a></li>
            <li><a href="/safety">Trust & Safety</a></li>
            <li><a href="/stocks">Stocks</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Account</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
          </ul>
        </div>
</div>
    

      <hr className="divider" />
      <p className="copyright">
        © {new Date().getFullYear()} Invest Smart — All Rights Reserved.
      </p>
    </footer>
  )
}