import React from "react";
import Sidebar from "../component/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
