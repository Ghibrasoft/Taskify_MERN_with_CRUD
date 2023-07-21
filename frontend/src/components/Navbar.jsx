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
import { useTranslation } from "react-i18next";

export default function Navbar({ lightMode, setLightMode }) {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const { currUser, language, setLanguage } = useZustandStore();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    i18n.changeLanguage(selectedLanguage);
  };

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
              <p>{t("navbar.home")}</p>
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
              <p>{t("navbar.profile")}</p>
            </Link>
            <button
              onClick={handleLogout}
              className="h-full flex items-center hover:bg-red-500 px-7 hover:text-white transition-colors"
            >
              <span className="mr-1">
                <MdLogout size={25} />
              </span>
              <p>{t("navbar.logout")}</p>
            </button>
          </>
        )}
      </div>

      {/* choose language */}
      {cookies.access_token && (
        <div className="h-full">
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="w-full h-full block py-2 px-3 cursor-pointer bg-inherit outline-none hover:bg-blue-500 hover:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="GE" className="bg-white text-black">
              GE
            </option>
            <option value="EN" className="bg-white text-black">
              EN
            </option>
          </select>
        </div>
      )}

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
          {t("navbar.home")}
          <span className="w-full h-full absolute -top-0 left-0 flex items-center justify-center text-[4rem] text-slate-500/30 opacity-0 hover:opacity-100 tracking-[3rem] hover:tracking-widest transition-all duration-200">
            {t("navbar.home")}
          </span>
        </Link>
        <Link
          to={"/profile"}
          onClick={() => setOpenNav(false)}
          className="relative py-5 text-3xl hover:text-blue-500 transitio-all"
        >
          {t("navbar.profile")}
          <span className="w-full h-full absolute -top-0 left-0 flex items-center justify-center text-[4rem] text-slate-500/30 opacity-0 hover:opacity-100 tracking-[3rem] hover:tracking-widest transition-all duration-200">
            {t("navbar.profile")}
          </span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="relative py-5 text-3xl hover:text-blue-500 transitio-all"
        >
          {t("navbar.logout")}
          <span className="w-full h-full absolute -top-0 left-0 flex items-center justify-center text-[4rem] text-slate-500/30 opacity-0 hover:opacity-100 tracking-[3rem] hover:tracking-widest transition-all duration-200">
            {t("navbar.logout")}
          </span>
        </button>
      </div>
    </nav>
  );
}
