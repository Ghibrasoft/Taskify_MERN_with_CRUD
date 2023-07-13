import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useZustandStore from "../store/ZustandStore";
import ChangePassForm from "../components/ChangePassForm";
import DelAccountConfModal from "../components/DelAccountConfModal";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUnorderedList,
  AiOutlineUserDelete,
  AiFillPlusCircle,
} from "react-icons/ai";
import icon from "../assets/avatar.jpeg";

export default function UserProfile() {
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [accountDelModal, setAccountDelModal] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [cookies, _] = useCookies(["access_token"]);
  const { currUser, getCurrUser, lightMode } = useZustandStore();
  const { avatar, username, email, userTodos } = currUser;

  // custom input (file) func
  function handleFileInput() {
    const target = inputFileRef.current;
    if (target) target.click();
  }

  useEffect(() => {
    getCurrUser(cookies);
  }, [getCurrUser, cookies]);

  return (
    <>
      <div className="h-full flex justify-center items-center">
        {/* user card */}
        <div className="sm:p-20 p-10 border rounded-lg shadow-lg flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col gap-5">
            {/* profile image */}
            <div className="flex justify-center">
              <div className="relative w-fit">
                <img
                  src={`${avatar ? `${avatar}` : `${icon}`}`}
                  alt="avatar"
                  className="w-32 h-32 rounded-lg"
                />
                {/* custom input (file) */}
                <div className="absolute bg-white rounded-full bottom-0 right-0 translate-x-4 translate-y-4">
                  <input
                    type="file"
                    name="avatar"
                    ref={inputFileRef}
                    className="absolute inset-0 opacity-0 -z-10"
                  />
                  <label
                    htmlFor="avatar"
                    onClick={handleFileInput}
                    className="cursor-pointer text-yellow-400"
                  >
                    <AiFillPlusCircle size={40} />
                  </label>
                </div>
              </div>
            </div>
            {/* username */}
            <div className="flex items-center gap-1">
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <span>
                  <AiOutlineUser size={15} />
                </span>
                Username:
              </p>
              <h1 className={`text-xl font-bold ${!lightMode && "text-white"}`}>
                {username}
              </h1>
            </div>
            {/* email */}
            <div className="flex items-center gap-1">
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <span>
                  <AiOutlineMail size={15} />
                </span>
                Email:
              </p>
              <h1 className={`text-xl font-bold ${!lightMode && "text-white"}`}>
                {email}
              </h1>
            </div>
            {/* Password */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                {!showChangePass ? (
                  <>
                    <p className="flex items-center gap-1 text-sm text-gray-400">
                      <span>
                        <AiOutlineLock size={15} />
                      </span>
                      Password:
                    </p>
                    <button
                      onClick={() => setShowChangePass(true)}
                      className="text-blue-500 text-sm hover:underline transition-all"
                    >
                      Change
                    </button>
                  </>
                ) : (
                  <ChangePassForm setShowChangePass={setShowChangePass} />
                )}
              </div>
            </div>
            {/* user's total tasks */}
            <div className="flex items-center gap-1">
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <span>
                  <AiOutlineUnorderedList size={15} />
                </span>
                Total tasks({userTodos && userTodos.length})
              </p>
              <Link
                to={"/mainpage"}
                className="flex items-center text-blue-500 text-sm hover:underline"
              >
                Show
              </Link>
            </div>
            {/* delete profile */}
            <button
              onClick={() => setAccountDelModal(true)}
              className="flex items-center justify-center bg-red-500 ring-2 ring-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 hover:ring-red-700 hover:ring-offset-2 active:ring-offset-1 group transition-all"
            >
              Delete account
              <AiOutlineUserDelete
                size={25}
                className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
              />
            </button>
          </div>
        </div>
      </div>

      <DelAccountConfModal
        accountDelModal={accountDelModal}
        setAccountDelModal={setAccountDelModal}
      />
    </>
  );
}
