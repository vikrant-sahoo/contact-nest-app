import React from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Navbar = () => {
      const {user} = useContext(UserContext);
      return (
            <div className="navbar">
                  <div className="navbar-left">
                        <Link to="/" className="navbar-logo">Contact-Nest</Link>
                  </div>
                  <div className="navbar-right">
                        {
                              user ? <>
                                    <Link className="navbar-link">{user.name}</Link>
                                    <Link to="/logout" className="navbar-link">Logout</Link>
                              </>
                              : <>
                                    <Link to="/login" className="navbar-link">Login</Link>
                                    <Link to="/register" className="navbar-link">Register</Link>
                              </>
                        }
                  </div>
            </div>
      );
};

export default Navbar;