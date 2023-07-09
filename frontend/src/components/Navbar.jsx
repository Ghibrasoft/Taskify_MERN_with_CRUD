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
      <div className="flex gap-5 mr-10">
        {!cookies.access_token ? (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/login"}>Log in</Link>
          </>
        ) : (
          <>
            <Link to={"/mainpage"}>Main page</Link>
            <Link to={"/profile"}>Profile</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
        {/* light/night mode */}
        <div className="flex items-center">
          <button
            onClick={() => setLightMode((prevState) => !prevState)}
            className=""
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
