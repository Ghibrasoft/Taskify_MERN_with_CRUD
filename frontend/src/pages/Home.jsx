import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <h1 className="text-5xl font-bold">Welcome</h1>
        <p>
          To manage your own tasks please
          <Link to={"/login"} className="ml-1 text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
