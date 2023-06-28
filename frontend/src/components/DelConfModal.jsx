import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useZustandStore from "../store/ZustandStore";

export default function DelConfModal({ todoId, openModal, setOpenModal }) {
  const { todos, deleteTodo } = useZustandStore();

  return (
    // backdrop
    <div
      onClick={() => setOpenModal(false)}
      className={`flex justify-center items-center fixed inset-0 transition-colors z-10 ${
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
          <h1 className="text-2xl font-bold">Confirm delete</h1>
          <p className="text-sm text-gray-500 whitespace-normal">
            Are you sure you want delete this task?
          </p>

          {/* buttons */}
          <div className="flex gap-1 mt-5">
            <button
              onClick={() => {
                setOpenModal(false);
                deleteTodo(todoId, todos);
                toast.error("Task Deleted!");
              }}
              className="bg-red-500 text-white rounded-xl px-5 py-2 hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-500 text-white rounded-xl px-5 py-2 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
