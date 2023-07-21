import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useZustandStore from "../store/ZustandStore";
import ChangePassForm from "../components/ChangePassForm";
import DelAccountConfModal from "../components/DelAccountConfModal";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUnorderedList,
  AiOutlineUserDelete,
} from "react-icons/ai";
import icon from "../assets/avatar.jpeg";
import ImgUploader from "../components/ImgUploader";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export default function UserProfile() {
  const [accountDelModal, setAccountDelModal] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const { currUser, getCurrUser, updateProfileImg, lightMode } =
    useZustandStore();
  const { avatar, username, email, userTodos } = currUser;
  const [cookies, _] = useCookies(["access_token"]);
  const { t } = useTranslation();

  useEffect(() => {
    console.log("start");
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
                  className="w-40 h-40 rounded-lg object-cover"
                />
                {/* custom input (file) */}
                <ImgUploader updateProfileImg={updateProfileImg} />
              </div>
            </div>
            {/* username */}
            <div className="flex items-center gap-1">
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <span>
                  <AiOutlineUser size={15} />
                </span>
                {t("profile.username")}:
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
                {t("profile.email")}:
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
                      {t("profile.password")}:
                    </p>
                    <button
                      onClick={() => setShowChangePass(true)}
                      className="text-blue-500 text-sm hover:underline transition-all"
                    >
                      {t("profile.changePassBtn")}
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
                {t("profile.totalTasks")}({userTodos && userTodos.length})
              </p>
              <Link
                to={"/mainpage"}
                className="flex items-center text-blue-500 text-sm hover:underline"
              >
                {t("profile.show")}
              </Link>
            </div>
            {/* delete profile */}
            <button
              onClick={() => setAccountDelModal(true)}
              className="flex items-center justify-center bg-red-500 ring-2 ring-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 hover:ring-red-700 hover:ring-offset-2 active:ring-offset-1 group transition-all"
            >
              {t("profile.delete")}
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
