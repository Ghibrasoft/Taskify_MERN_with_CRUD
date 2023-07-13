import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useZustandStore from "../store/ZustandStore";

export default function Layout({ children }) {
  const { lightMode, setLightMode } = useZustandStore();
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`h-14 shadow-lg fixed w-full z-20 ${
          lightMode ? "bg-slate-800 text-white" : "bg-white"
        }`}
      >
        <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      </header>
      <main className={`flex-grow flex ${lightMode ? "" : "bg-slate-800"}`}>
        <div className="flex-grow">{children}</div>
      </main>
      <footer
        className={`h-14 w-full fixed bottom-0 z-10 ${
          lightMode ? "bg-slate-800 text-white" : "bg-white border-t-2"
        }`}
      >
        <Footer />
      </footer>
    </div>
  );
}
