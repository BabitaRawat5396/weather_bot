import "./App.css";

import Login from "./page/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageAPIKeys from "./component/Admin/ManageAPIKeys";
import ManageMessage from "./component/Admin/ManageMessage";
import Dashboard from "./page/Dashboard";
import Users from "./component/Admin/ManageUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ManageAPIKeys />} />
          <Route path="/dashboard/manage-keys" element={<ManageAPIKeys />} />
          <Route path="/dashboard/manage-message" element={<ManageMessage />} />
          <Route path="/dashboard/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
