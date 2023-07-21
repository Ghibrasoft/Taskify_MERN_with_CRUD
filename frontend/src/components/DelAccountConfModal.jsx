import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import useZustandStore from "../store/ZustandStore";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function DelAccountConfModal({
  accountDelModal,
  setAccountDelModal,
}) {
  const [_, setCookies] = useCookies(["access_token"]);
  const { deleteUserAccount } = useZustandStore();
  const { t } = useTranslation();

  function handleDeleteProfile() {
    const userID = window.localStorage.getItem("userID");

    toast.promise(
      deleteUserAccount(userID)
        .then(() => {
          setCookies("access_token", "");
          window.localStorage.removeItem("userID");
        })
        .catch((error) => console.error(error)),
      {
        pending: "Loading...",
        success: "Your account deleted",
        error: "Something went wrong",
      }
    );
  }

  return (
    // backdrop
    <div
      onClick={() => setAccountDelModal(false)}
      className={`flex justify-center items-center fixed inset-0 transition-colors z-20 ${
        accountDelModal ? "visible bg-black/50" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-7 transition-opacity ${
          accountDelModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {/* modal body */}
        <div className="flex flex-col items-center">
          <AiOutlineUserDelete size={45} color="red" />
          <h1 className="text-2xl font-bold">{t("modalDel.title")}</h1>
          <p className="flex flex-col items-center text-sm text-gray-500 whitespace-normal">
            {t("modalAccount.msg1")}
            <small className="text-red-500">({t("modalAccount.msg2")})</small>
          </p>

          {/* buttons */}
          <div className="flex gap-1 mt-5">
            <button
              onClick={handleDeleteProfile}
              className="bg-red-500 text-white rounded-xl px-5 py-2 hover:bg-red-700 transition-colors"
            >
              {t("modalDelBtn")}
            </button>
            <button
              onClick={() => setAccountDelModal(false)}
              className="bg-gray-500 text-white rounded-xl px-5 py-2 hover:bg-gray-700 transition-colors"
            >
              {t("modalCancelBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
