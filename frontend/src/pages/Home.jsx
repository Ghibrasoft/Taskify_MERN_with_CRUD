import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Home() {
  return (
    <div className="home-page h-full flex justify-center items-center bg-center bg-cover bg-no-repeat">
      <div className="w-[500px] h-[250px] flex flex-col items-center gap-3">
        <h1 className="text-3xl sm:text-7xl font-bold">Welcome</h1>
        <p className="text-2xl">Manage your own tasks</p>
        <Link
          to={"/login"}
          className="w-fit flex items-center justify-center ring-1 ring-blue-500 pl-5 pr-2 py-2 rounded-full hover:text-blue-500 active:bg-blue-100 active:ring-offset-2 group transition-all"
        >
          <p>Get started</p>
          <span className="opacity-0 -translate-x-1 text-blue-500 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all">
            <AiOutlineArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
}
