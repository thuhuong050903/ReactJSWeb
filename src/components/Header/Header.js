import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Home from '../../pages/Home/Home';
import AdminPage from '../../pages/AdminPage/Admin';
import './Header.css';

function Header() {
  return (
    <Router>
      <div className="header-container">
        
        <nav className="nav-container">
        <div className="logo-container">
          <img src="https://www.hoteljob.vn/uploads/images/19-04-20-20/LOGO_NGANG.png" alt="Logo" className="logo" />
        </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/Home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/AdminPage" className="nav-link">AdminPage</Link>
            </li>
          </ul>
          <div className="user-actions">
            <button className="btn">Đăng nhập</button>
            <button className="btn">Đăng kí</button>
            <button className="btn">
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>          </div>
        </nav>

        
      </div>
      <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/AdminPage" element={<AdminPage />} />
        </Routes>
    </Router>
  );
}

export default Header;
