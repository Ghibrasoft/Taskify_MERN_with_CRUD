import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useZustandStore from "../store/ZustandStore";
import ChangePassForm from "../components/ChangePassForm";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [showChangePass, setShowChangePass] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const { currUser, getCurrUser, deleteUserAccount } = useZustandStore();
  const { username, userTodos } = currUser;

  function handleDeleteProfile() {
    const userID = window.localStorage.getItem("userID");
    deleteUserAccount(userID)
      .then(() => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        toast.success("User account deleted!");
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getCurrUser(cookies);
  }, [getCurrUser, cookies]);

  return (
    <div className="h-full flex justify-center items-center">
      {/* user card */}
      <div className="w-[500px] h-[500px] border rounded-lg shadow-lg flex flex-col justify-center items-center gap-3">
        {/* username */}
        <div className="flex gap-1">
          <h1>Username:</h1>
          <p>{username}</p>
        </div>
        {/* user's total tasks */}
        <div className="flex gap-1">
          <h1>Total tasks:</h1>
          <p>({userTodos && userTodos.length})</p>
          <Link
            to={"/mainpage"}
            className="flex items-center text-blue-500 hover:underline"
          >
            Show
          </Link>
        </div>
        {/* change password */}
        <div className="flex flex-col gap-1">
          {!showChangePass ? (
            <button
              onClick={() => setShowChangePass(true)}
              className="bg-blue-500 ring-1 ring-blue-500 text-white text-sm px-3 py-2 rounded-md hover:ring-offset-2 active:ring-offset-1 transition-all"
            >
              Change password
            </button>
          ) : (
            <ChangePassForm setShowChangePass={setShowChangePass} />
          )}
        </div>
        {/* delete profile */}
        <button
          onClick={handleDeleteProfile}
          className="bg-red-500 ring-1 ring-red-500 text-white text-sm px-4 py-2 rounded-md hover:ring-offset-2 active:ring-offset-1 transition-all"
        >
          Delete profile
        </button>
      </div>
    </div>
  );
}
