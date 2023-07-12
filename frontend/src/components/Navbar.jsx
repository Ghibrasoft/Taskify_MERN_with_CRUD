import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineLightMode,
  MdOutlineModeNight,
  MdMenu,
  MdClose,
} from "react-icons/md";

export default function Navbar({ lightMode, setLightMode }) {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  function handleLogout() {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  }

  return (
    <nav className="h-full flex justify-between items-center">
      <div>Navbar</div>

      {/* navigation tabs */}
      <div className="h-full flex items-center mr-10">
        {cookies.access_token && (
          <>
            <Link
              to={"/mainpage"}
              className="h-full flex items-center hover:bg-blue-500 px-7 hover:text-white transition-colors"
            >
              Main page
            </Link>
            <Link
              to={"/profile"}
              className="h-full flex items-center hover:bg-blue-500 px-7 hover:text-white transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="h-full flex items-center hover:bg-blue-500 px-7 hover:text-white transition-colors"
            >
              Log out
            </button>
          </>
        )}
        {/* light/night mode */}
        <div className="h-full flex items-center">
          <button
            onClick={() => setLightMode((prevState) => !prevState)}
            className="h-full px-5 hover:bg-blue-500 hover:text-white transition-colors"
          >
            {lightMode ? (
              <MdOutlineLightMode size={25} />
            ) : (
              <MdOutlineModeNight size={25} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
