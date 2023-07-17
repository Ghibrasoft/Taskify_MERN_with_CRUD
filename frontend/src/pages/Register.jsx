import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useZustandStore from "../store/ZustandStore";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Register() {
  const { registerUser, lightMode } = useZustandStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const registerFormRef = useRef(null);

  async function handleRegister(e) {
    e.preventDefault();

    const registerFormData = new FormData(registerFormRef.current);
    const newUser = Object.fromEntries(registerFormData);

    try {
      const res = await toast.promise(registerUser(newUser), {
        pending: "Registering...",
        success: "Register success!",
        error: "Registration failed",
      });

      if (res.status === 200) {
        navigate("/login");
        registerFormRef.current.reset();
      }

      // console.log("Register success!");
    } catch (error) {
      // console.error("Register failed", error);

      if (error.response && error.response.status === 409) {
        toast.error("Username or Email already exists!");
      } else {
        toast.error("Registration failed due to an internal server error");
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col w-4/5 sm:w-[400px] gap-5 border rounded-lg px-10 py-20 shadow-lg">
        <h1
          className={`text-center text-2xl font-bold py-1 mb-5 border-b border-blue-500 ${
            !lightMode && "text-white"
          }`}
        >
          Create an account
        </h1>
        <form
          ref={registerFormRef}
          onSubmit={handleRegister}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            name="username"
            placeholder="Username..."
            required
            className="px-4 py-2 rounded-md shadow outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            required
            className="px-4 py-2 rounded-md shadow outline-none"
          />
          <div className="w-full flex items-center relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder="Password..."
              required
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
            className="py-2 rounded-md text-white ring-2 ring-blue-500 hover:ring-offset-2 hover:ring-blue-700 active:ring-offset-1 bg-blue-500 hover:bg-blue-700 transition-all"
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-1">
          <span className={`${!lightMode && "text-white"}`}>
            Already have an account?
          </span>
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
