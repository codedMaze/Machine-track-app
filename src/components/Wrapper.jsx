import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Wrapper = () => {
  return (
    <>
      <Navbar>
        <main className="mt-16">
          <Outlet />
        </main>
      </Navbar>
    </>
  );
};

export default Wrapper;
