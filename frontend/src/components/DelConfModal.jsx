import React, { useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useZustandStore from "../store/ZustandStore";
import { useTranslation } from "react-i18next";

export default function DelConfModal({
  openModal,
  setOpenModal,
  checkedTodo,
  setCheckedTodo,
  setOpenMultiSelect,
}) {
  const { todos, deleteTodo } = useZustandStore();
  const { t } = useTranslation();

  const handleDelete = useCallback(async () => {
    try {
      await deleteTodo(checkedTodo, todos);
      setOpenModal(false);
      setOpenMultiSelect(false);
      setCheckedTodo([]);
      toast.error("Task Deleted!");
    } catch (error) {
      console.error(error);
    }
  }, [
    checkedTodo,
    deleteTodo,
    setCheckedTodo,
    setOpenModal,
    setOpenMultiSelect,
    todos,
  ]);

  return (
    // backdrop
    <div
      onClick={() => setOpenModal(false)}
      className={`flex justify-center items-center fixed inset-0 transition-colors z-20 ${
        openModal ? "visible bg-black/50" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-7 transition-opacity ${
          openModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {/* modal body */}
        <div className="flex flex-col items-center">
          <AiOutlineDelete size={45} color="red" />
          <h1 className="text-2xl font-bold">{t("modalDel.title")}</h1>
          <p className="text-sm text-gray-500 whitespace-normal">
            {t("modalDelTodo.msg")}
          </p>

          {/* buttons */}
          <div className="flex gap-1 mt-5">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded-xl px-5 py-2 hover:bg-red-700 transition-colors"
            >
              {t("modalDelBtn")}
            </button>
            <button
              onClick={() => setOpenModal(false)}
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
