import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useZustandStore from "../store/ZustandStore";
import { useCookies } from "react-cookie";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const { loginUser } = useZustandStore();
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const loginFormRef = useRef(null);

  async function handleLogin(e) {
    e.preventDefault();

    const loginFormData = new FormData(loginFormRef.current);
    const loginUserData = Object.fromEntries(loginFormData);

    try {
      const res = await loginUser(loginUserData);

      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      loginFormRef.current.reset();

      if (res.status === 200) navigate("/mainpage");

      console.log("Login success!");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col w-4/5 sm:w-[400px] gap-5 border rounded-lg px-10 py-20 ">
        <h1 className="text-center">Log in</h1>
        <form
          ref={loginFormRef}
          onSubmit={handleLogin}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            name="username"
            placeholder="Username..."
            className="px-4 py-2 rounded-md shadow outline-none"
          />
          <div className="w-full flex items-center relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder="Password..."
              className="w-full px-4 py-2 rounded-md shadow outline-none"
            />
            <span
              className="absolute -translate-y-1/2 top-1/2 right-3 cursor-pointer text-gray-300 hover:text-gray-500 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiFillEye size={25} />
              ) : (
                <AiFillEyeInvisible size={25} />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="border px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 transition-colors"
          >
            Log in
          </button>
        </form>

        <div className="">
          <span>Not have an account?</span>
          <Link to={"/register"} className="ml-1 text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
