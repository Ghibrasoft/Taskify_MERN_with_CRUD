import React, { useCallback, useState } from "react";
import useZustandStore from "../store/ZustandStore";
import DelConfModal from "./DelConfModal";
import {
  AiOutlineCloseCircle,
  AiOutlineUndo,
  AiOutlineCheckCircle,
  AiOutlineRise,
} from "react-icons/ai";
import { toast } from "react-toastify";

export default function InProgressTodos({ searchWord }) {
  const { togglePending, toggleDone, todos, lightMode } = useZustandStore();
  const inProgressTodos = todos.filter(
    (todo) => todo.pending === false && todo.done === false
  );
  const inProgressIds = inProgressTodos.map((todo) => todo._id);

  const [openMultiSelect, setOpenMultiSelect] = useState(false);
  const [checkedTodo, setCheckedTodo] = useState([]);
  const disableBtn = checkedTodo.length === 0;

  // for modal
  const [openModal, setOpenModal] = useState(false);

  // delete one task
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
        <div
          className={`border-b-2 border-yellow-500 bg-white sticky top-0 flex justify-between z-10 ${
            !lightMode && "bg-inherit text-white"
          }`}
        >
          <p className="flex items-center">
            <span className="text-yellow-500">
              <AiOutlineRise size={25} />
            </span>
            In progress ({inProgressTodos.length})
          </p>

          {/* multi select */}
          {inProgressTodos.length > 1 && (
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
                      setCheckedTodo(inProgressIds);
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
          {inProgressTodos
            .filter(({ todo }) => todo.toLocaleLowerCase().includes(searchWord))
            .map(({ _id, todo, pending, done, createdAt }) => (
              <li
                key={_id}
                className="flex justify-between border rounded-lg p-3 bg-yellow-100 hover:bg-yellow-200 transition-colors group"
              >
                {/* checkbox */}
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
                  {/* done button */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleDone(_id, done);
                      toast.success("Task done!");
                    }}
                    className="text-gray-500 hover:text-green-500 transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <AiOutlineCheckCircle size={25} />
                    </span>
                  </button>
                  {/* undo button */}
                  <button
                    type="button"
                    onClick={() => {
                      togglePending(_id, pending);
                      toast.info("Task back to pending!");
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
        openModal={openModal}
        setOpenModal={setOpenModal}
        checkedTodo={checkedTodo}
        setCheckedTodo={setCheckedTodo}
        setOpenMultiSelect={setOpenMultiSelect}
      />
    </>
  );
}
