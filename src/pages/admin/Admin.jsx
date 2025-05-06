import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/sections/Adminsidebar";

const Admin = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
