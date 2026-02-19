
// import { Link } from "react-router-dom";
// import { useContext , useState } from "react";
// import { AuthContext } from "../context/authContext"; // make sure path is correct
// import "./Navbar.css";
// const toggleMenu = () => setMenuOpen(!menuOpen);

// export default function Navbar() {
//   const context = useContext(AuthContext);

//   // Safety check if context is missing
//   if (!context) {
//     console.error("AuthContext is undefined. Make sure Navbar is inside <AuthProvider>.");
//     return null;
//   }

//   const { isLoggedIn, logout } = context; // Now this will always exist

//   return (
//     <nav>
//       <h2 className="logo">InvestSmart</h2>

//       {/* Hamburger icon for mobile*/}
//       <div className="hamburger" onClick= {() => setMenuOpen(!menuOpen)} >
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>

//       </div>
//       <div className={`nav-links ${menuOpen ? "open" : ""}`
//       }>
//         <Link to="/" onClick={() => setMenuOpen (false)}>Home</Link>
//         <Link to="/compare" onClick={() => setMenuOpen (false)}>Compare Stocks</Link>
//         <Link to="/resources" onClick={() => setMenuOpen (false)}>Resources</Link>
//         <Link to="/about" onClick={() => setMenuOpen (false)}>About</Link>

//         {!isLoggedIn && (
//           <Link className="login-btn" to="/login" onClick={() => setMenuOpen (false)}>
//             Login
//           </Link>
//         )}

//         {isLoggedIn && (
//           <>
//             <span className="welcome-text">Welcome! ✅</span>
//             <button className="logout-btn" onClick= {()=> {logout () ; setMenuOpen(false) ; }}>
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import { useContext, useState } from "react"; // ✅ useState imported
import { AuthContext } from "../context/authContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  // ✅ State for hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <h2 className="logo">InvestSmart</h2>

      {/* Hamburger menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navigation links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/compare" onClick={() => setMenuOpen(false)}>Compare Stocks</Link>
        <Link to="/resources" onClick={() => setMenuOpen(false)}>Resources</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

        {!isLoggedIn && (
          <Link className="login-btn" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}

        {isLoggedIn && (
          <>
            <span className="welcome-text">Welcome! ✅</span>
            <button className="logout-btn" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}