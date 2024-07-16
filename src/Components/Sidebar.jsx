import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaRegAddressCard, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import "../assets/css/sidebar.css";

export const Sidebar = () => {
      const [activeLink, setActiveLink] = useState(1);
      return (
            <div className="sidebar">
                  <div className="sidebar-item"></div>
                  <div className={`sidebar-item ${activeLink === 1 ? "active" : ""}`} onClick={() => setActiveLink(1)}>
                        <Link to="/dashboard" className="sidebar-link"><FaRegAddressCard className="icon" /> Contacts</Link>
                  </div>
                  <div className={`sidebar-item ${activeLink === 2 ? "active" : ""}`} onClick={() => setActiveLink(2)}>
                        <Link to="/dashboard/add-contact" className="sidebar-link"><FaPlusCircle className="icon" /> Add Contact</Link>
                  </div>
                  <div className={`sidebar-item ${activeLink === 3 ? "active" : ""}`} onClick={() => setActiveLink(3)}>
                        <Link to="/logout" className="sidebar-link"><FaSignOutAlt className="icon" /> Exit</Link>
                  </div>
            </div>
      );
};