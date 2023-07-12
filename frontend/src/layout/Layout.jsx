import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  const [lightMode, setLightMode] = useState(true);
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`h-14 shadow-lg ${
          lightMode ? "bg-slate-800 text-white" : ""
        }`}
      >
        <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      </header>
      <main className={`flex-grow flex ${lightMode ? "" : "bg-slate-800"}`}>
        <div className="flex-grow">{children}</div>
      </main>
      <footer className={`h-14 ${lightMode ? "bg-slate-800 text-white" : ""}`}>
        <Footer />
      </footer>
    </div>
  );
}
