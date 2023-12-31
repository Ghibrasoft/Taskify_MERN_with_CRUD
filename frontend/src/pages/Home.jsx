import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [cookies, _] = useCookies(["access_token"]);
  const { t } = useTranslation();

  return (
    <div className="home-page bg-center bg-cover bg-no-repeat h-full flex justify-center items-center">
      <div className="sm:p-20 p-10 flex flex-col items-center gap-3">
        <h1 className="text-3xl sm:text-7xl font-bold">{t("home.welcome")}</h1>
        <p className="text-2xl">{t("home.welcomeMsg")}</p>
        <Link
          to={`${cookies.access_token ? "/mainpage" : "/login"}`}
          className="w-fit flex items-center justify-center ring-1 ring-blue-500 pl-5 pr-2 py-2 rounded-full hover:text-blue-500 active:bg-blue-100 active:ring-offset-2 group transition-all"
        >
          {cookies.access_token ? (
            <p>{t("home.goToMain")}</p>
          ) : (
            <p>{t("home.getStarted")}</p>
          )}
          <span className="opacity-0 -translate-x-1 text-blue-500 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all">
            <AiOutlineArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
}
