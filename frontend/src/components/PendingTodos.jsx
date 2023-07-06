import React, { useCallback, useRef, useState } from "react";
import useZustandStore from "../store/ZustandStore";
import {
  AiOutlineRocket,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineCloseCircle,
  AiOutlineHourglass,
} from "react-icons/ai";
import DelConfModal from "./DelConfModal";
import { toast } from "react-toastify";

export default function PendingTodos({ searchWord }) {
  const { togglePending, todos, updateTodo, getTodos } = useZustandStore();
  const pendingTodos = todos.filter((todo) => todo.pending === true);
  const pendingIds = pendingTodos.map((todo) => todo._id);

  // checkbox
  const [openMultiSelect, setOpenMultiSelect] = useState(false);
  const [checkedTodo, setCheckedTodo] = useState([]);
  const disableBtn = checkedTodo.length === 0;

  // for modal
  const [openModal, setOpenModal] = useState(false);

  // for editing todo
  const editTodoRef = useRef(null);
  const [editTodo, setEditTodo] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [selectedId, setSelectedId] = useState("");

  // edit task
  const editHandler = useCallback(
    (id) => {
      if (editedTodo) {
        updateTodo(id, todos, editedTodo)
          .then(() => {
            getTodos();
            toast.success("Task updated!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [editedTodo, getTodos, updateTodo, todos]
  );

  // delete single task, opens modal
  function deleteHandler(id) {
    setCheckedTodo((prevState) => [...prevState, id]);
    setOpenModal(true);
  }

  // check todo for delete many
  const handleCheckTodo = useCallback(
    (id) => {
      if (!checkedTodo.includes(id)) {
        setCheckedTodo((prevState) => [...prevState, id]);
      } else {
        setCheckedTodo((prevState) => prevState.filter((item) => item !== id));
      }
    },
    [checkedTodo]
  );

  return (
    <>
      <div className="flex flex-col gap-5 pb-5 overflow-y-auto">
        <div className="border-b-2 border-slate-500 bg-white sticky top-0 flex justify-between z-10">
          <p className="flex items-center">
            <span className="text-slate-500">
              <AiOutlineHourglass size={25} />
            </span>
            Pending ({pendingTodos.length})
          </p>

          {/* multi select */}
          {pendingTodos.length > 1 && (
            <div className="flex gap-1 mb-1">
              {openMultiSelect ? (
                <>
                  <button
                    type="button"
                    disabled={disableBtn}
                    onClick={() => setOpenModal(true)}
                    className={`text-[10px] px-3 py-1 rounded-md text-white ${
                      disableBtn ? "bg-gray-300" : "bg-red-500"
                    }`}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMultiSelect(false);
                      setCheckedTodo([]);
                    }}
                    className="text-[10px] px-3 py-1 rounded-md bg-gray-500 text-white"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckedTodo(pendingIds);
                      setOpenMultiSelect(true);
                    }}
                    className="text-[10px] px-3 py-1 rounded-md bg-blue-500 text-white"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenMultiSelect(true)}
                    className="text-[10px] px-3 py-1 rounded-md bg-blue-500 text-white"
                  >
                    Select many
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* displaying todos */}
        <ul className="flex flex-col gap-2">
          {pendingTodos
            .filter(({ todo }) => todo.includes(searchWord))
            .map(({ _id, todo, pending, createdAt }) => (
              <li
                key={_id}
                className="flex justify-between border rounded-lg p-3 bg-slate-100 hover:bg-slate-200 transition-colors group"
              >
                {/* open checkbox button */}
                {openMultiSelect && (
                  <div className="flex items-center w-7 mr-3">
                    <input
                      type="checkbox"
                      checked={checkedTodo.includes(_id)}
                      onChange={() => handleCheckTodo(_id)}
                      className="w-full h-full"
                    />
                  </div>
                )}
                {/* todo text content */}
                <div className="w-full overflow-hidden break-words">
                  {editTodo && _id === selectedId ? (
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
                  {/* start button */}
                  <button
                    type="button"
                    onClick={() => {
                      togglePending(_id, pending);
                      toast.warning("Task in progress!");
                    }}
                    className="text-gray-500 hover:text-green-500 transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <AiOutlineRocket size={30} className="rotate-45" />
                    </span>
                  </button>
                  {/* edit button */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditTodo((prev) => !prev);
                      setSelectedId(_id);
                    }}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {editTodo && _id === selectedId ? (
                        <AiOutlineCheck
                          size={25}
                          onClick={() => editHandler(_id)}
                        />
                      ) : (
                        <AiOutlineEdit size={25} />
                      )}
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
        openModal={openModal}
        setOpenModal={setOpenModal}
        checkedTodo={checkedTodo}
        setCheckedTodo={setCheckedTodo}
        setOpenMultiSelect={setOpenMultiSelect}
      />
    </>
  );
}
