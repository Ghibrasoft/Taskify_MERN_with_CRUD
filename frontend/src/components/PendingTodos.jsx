import React, { useRef, useState } from "react";
import useZustandStore from "../store/ZustandStore";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import DelConfModal from "./DelConfModal";
import { toast } from "react-toastify";

export default function PendingTodos() {
  const { toggleTodo, todos, updateTodo, getTodos } = useZustandStore();
  const pendingTodos = todos.filter((todo) => todo.completed !== true);

  // for modal
  const [openModal, setOpenModal] = useState(false);
  const [todoId, setTodoId] = useState("");

  // for updating todo
  const editTodoRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");

  // edit task
  function editHandler(id) {
    if (editedTodo) {
      updateTodo(id, todos, editedTodo);
      getTodos();
      toast.success("Task updated!");
    }
  }

  // delete task
  function deleteHandler(id) {
    setTodoId(id);
    setOpenModal(true);
  }

  return (
    <>
      <div className="flex flex-col gap-5 pb-5 overflow-y-auto">
        <h1 className="border-b-2 border-yellow-500 bg-white sticky top-0">
          Pending ({pendingTodos.length})
        </h1>

        <ul className="flex flex-col gap-2">
          {pendingTodos.map(({ _id, todo, completed, createdAt }) => (
            <li
              key={_id}
              className="flex justify-between border rounded-lg p-3 bg-yellow-100 hover:bg-yellow-200 transition-colors group"
            >
              {/* todo text content */}
              <div className="w-full overflow-hidden break-words">
                {edit ? (
                  <input
                    ref={editTodoRef}
                    type="text"
                    defaultValue={todo}
                    onChange={() => setEditedTodo(editTodoRef.current.value)}
                    className="px-3 py-1 rounded-lg shadow outline-none"
                  />
                ) : (
                  <p>{todo}</p>
                )}
                {/* display date&time */}
                <div className="flex items-center gap-1 mt-2 text-blue-300">
                  <small>{new Date(createdAt).toLocaleDateString()}</small>
                  <span className="text-gray-500">|</span>
                  <small>{new Date(createdAt).toLocaleTimeString()}</small>
                </div>
              </div>
              {/* buttons */}
              <div className="flex gap-2">
                {/* edit button */}
                <button
                  onClick={() => setEdit((prev) => !prev)}
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {edit ? (
                      <AiOutlineCheck
                        size={25}
                        onClick={() => editHandler(_id)}
                      />
                    ) : (
                      <AiOutlineEdit
                        size={25}
                        onClick={() => {
                          setTimeout(() => {
                            editTodoRef.current.focus();
                          }, 0);
                        }}
                      />
                    )}
                  </span>
                </button>
                {/* done button */}
                <button
                  type="button"
                  onClick={() => {
                    toggleTodo(_id, completed);
                    toast.success("Task done!");
                  }}
                  className="text-gray-500 hover:text-green-500 transition-colors"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiOutlineCheckCircle size={25} />
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
