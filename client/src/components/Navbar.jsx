import { NavLink } from "react-router-dom";
import "./Navbar.css";

import React from 'react'

const Navbar = () => {
  return (
        <>
          <header>
            <div className="container_nav">
              <div>
                <NavLink to="/" className="logo-brand">Bansiwale Technical</NavLink>
              </div>
    
              <nav>
                <ul>
                  <li>
                    <NavLink to="/"> Home </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about"> About </NavLink>
                  </li>
                  <li>
                    <NavLink to="/service"> Services </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact"> Contact </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </>
      );
    };
export default Navbar