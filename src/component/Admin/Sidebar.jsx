import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>ADMIN Panel</h2>
      <ul className="sidebar-menu">
        <NavLink to="/dashboard/manage-keys">
          <li>Managing API Keys</li>
        </NavLink>
        <NavLink to="/dashboard/manage-message">
          <li>Message Frequency</li>
        </NavLink>
        <NavLink to="/dashboard/users">
          <li>Users</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
