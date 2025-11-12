import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col ">
      <Navbar></Navbar>
      <main className="min-h-screen max-w-[1440px] mx-auto ">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </div>
  );
}
