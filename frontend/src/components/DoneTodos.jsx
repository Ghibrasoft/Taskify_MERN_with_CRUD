import React, { useState } from "react";
import useZustandStore from "../store/ZustandStore";
import DelConfModal from "./DelConfModal";
import { AiOutlineCloseCircle, AiOutlineUndo } from "react-icons/ai";
import { toast } from "react-toastify";

export default function DoneTodos() {
  const { toggleTodo, todos } = useZustandStore();
  const doneTodos = todos.filter((todo) => todo.completed !== false);

  // for modal
  const [openModal, setOpenModal] = useState(false);
  const [todoId, setTodoId] = useState("");

  function deleteHandler(id) {
    setTodoId(id);
    setOpenModal(true);
  }

  return (
    <>
      <div className="flex flex-col gap-5 pb-5 overflow-y-auto">
        <h1 className="border-b-2 border-green-500 bg-white sticky top-0">
          Done ({doneTodos.length})
        </h1>

        <ul className="flex flex-col gap-2">
          {doneTodos.map(({ _id, todo, completed, createdAt }) => (
            <li
              key={_id}
              className="flex justify-between border rounded-lg p-3 bg-green-100 hover:bg-green-200 transition-colors group"
            >
              {/* todo text content */}
              <div className="w-full overflow-hidden break-words">
                <p>{todo}</p>
                {/* display date&time */}
                <div className="flex items-center gap-1 mt-2 text-blue-300">
                  <small>{new Date(createdAt).toLocaleDateString()}</small>
                  <span className="text-gray-500">|</span>
                  <small>{new Date(createdAt).toLocaleTimeString()}</small>
                </div>
              </div>
              {/* buttons */}
              <div className="flex gap-2">
                {/* undo button */}
                <button
                  type="button"
                  onClick={() => {
                    toggleTodo(_id, completed);
                    toast.warning("Task undone!");
                  }}
                  className="text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiOutlineUndo size={25} />
                  </span>
                </button>
                {/* delete button */}
                <button
                  type="button"
                  onClick={() => deleteHandler(_id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiOutlineCloseCircle size={25} />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <DelConfModal
        todoId={todoId}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
