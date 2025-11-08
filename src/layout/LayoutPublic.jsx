import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutPublic = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutPublic;
