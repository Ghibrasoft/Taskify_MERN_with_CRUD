import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineLightMode,
  MdOutlineModeNight,
  MdMenu,
  MdClose,
  MdHome,
  MdLogout,
} from "react-icons/md";
import icon from "../assets/avatar.jpeg";
import useZustandStore from "../store/ZustandStore";

export default function Navbar({ lightMode, setLightMode }) {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const { currUser } = useZustandStore();

  function handleLogout() {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    setOpenNav(false);
    navigate("/");
  }

  return (
    <nav className="h-full flex justify-between items-center">
      {/* navigation tabs */}
      <div className="h-full hidden sm:flex items-cente ms-auto">
        {cookies.access_token && (
          <>
            <Link
              to={"/mainpage"}
              className={`h-full flex items-center hover:bg-blue-500 px-7 hover:text-white transition-colors ${
                window.location.pathname === "/mainpage" &&
                "bg-blue-500 text-white"
              }`}
            >
              <span className="mr-1">
                <MdHome size={25} />
              </span>
              <p>Main page</p>
            </Link>
            <Link
              to={"/profile"}
              className={`h-full flex items-center hover:bg-blue-500 px-7 hover:text-white transition-colors ${
                window.location.pathname === "/profile" &&
                "bg-blue-500 text-white"
              }`}
            >
              {cookies.access_token && (
                <span className="mr-1">
                  <img
                    src={currUser.avatar ? currUser.avatar : icon}
                    alt="user-avatar"
                    className="w-7 h-7 rounded-full object-cover cursor-pointer"
                    onClick={() => navigate("/mainpage")}
                  />
                </span>
              )}
              <p>Profile</p>
            </Link>
            <button
              onClick={handleLogout}
              className="h-full flex items-center hover:bg-blue-500 px-7 hover:text-white transition-colors"
            >
              <span className="mr-1">
                <MdLogout size={25} />
              </span>
              <p>Log out</p>
            </button>
          </>
        )}
      </div>

      {/* light/night mode */}
      <div className="h-full flex items-center me-auto sm:m-0">
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

      {/* hamburger menu */}
      {cookies.access_token && (
        <div
          onClick={() => setOpenNav((prevState) => !prevState)}
          className="sm:hidden z-10"
        >
          {openNav ? <MdClose size={35} /> : <MdMenu size={35} />}
        </div>
      )}

      {/* mobile version */}
      <div
        className={`${
          !openNav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-slate-800 text-white flex flex-col justify-center items-center "
        }`}
      >
        <Link
          to={"/mainpage"}
          onClick={() => setOpenNav(false)}
          className="relative py-5 text-3xl hover:text-blue-500 transitio-all"
        >
          Main
          <span className="w-full h-full absolute -top-0 left-0 flex items-center justify-center text-[4rem] text-slate-500/30 opacity-0 hover:opacity-100 tracking-[3rem] hover:tracking-widest transition-all duration-200">
            Main
          </span>
        </Link>
        <Link
          to={"/profile"}
          onClick={() => setOpenNav(false)}
          className="relative py-5 text-3xl hover:text-blue-500 transitio-all"
        >
          Profile
          <span className="w-full h-full absolute -top-0 left-0 flex items-center justify-center text-[4rem] text-slate-500/30 opacity-0 hover:opacity-100 tracking-[3rem] hover:tracking-widest transition-all duration-200">
            Profile
          </span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="relative py-5 text-3xl hover:text-blue-500 transitio-all"
        >
          Log out
          <span className="w-full h-full absolute -top-0 left-0 flex items-center justify-center text-[4rem] text-slate-500/30 opacity-0 hover:opacity-100 tracking-[3rem] hover:tracking-widest transition-all duration-200">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
