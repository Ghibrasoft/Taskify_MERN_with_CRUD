import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useZustandStore from "../store/ZustandStore";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const { registerUser } = useZustandStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const registerFormRef = useRef(null);

  async function handleRegister(e) {
    e.preventDefault();

    const registerFormData = new FormData(registerFormRef.current);
    const newUser = Object.fromEntries(registerFormData);

    try {
      const res = await registerUser(newUser);
      registerFormRef.current.reset();

      if (res.status === 200) navigate("/login");

      console.log("Register success!");
    } catch (error) {
      console.error("Register failed", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col w-4/5 sm:w-[400px] gap-5 border rounded-lg px-10 py-20">
        <h1 className="text-center">Register</h1>
        <form
          ref={registerFormRef}
          onSubmit={handleRegister}
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
            Register
          </button>
        </form>

        <div className="">
          <span>Already have an account?</span>
          <Link to={"/login"} className="ml-1 text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
