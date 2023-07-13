import React, { useCallback, useState } from "react";
import useZustandStore from "../store/ZustandStore";
import DelConfModal from "./DelConfModal";
import {
  AiOutlineCloseCircle,
  AiOutlineUndo,
  AiOutlineFileDone,
} from "react-icons/ai";
import { toast } from "react-toastify";

export default function DoneTodos({ searchWord }) {
  const { toggleDone, todos, lightMode } = useZustandStore();
  const doneTodos = todos.filter((todo) => todo.done === true);
  const doneTodosIds = doneTodos.map((todo) => todo._id);

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
          className={`border-b-2 border-green-500 sticky top-0 flex justify-between z-10 ${
            !lightMode && "bg-inherit text-white"
          }`}
        >
          <p className="flex items-center">
            <span className="text-green-500">
              <AiOutlineFileDone size={25} />
            </span>
            Done ({doneTodos.length})
          </p>

          {/* multi select */}
          {doneTodos.length > 1 && (
            <div className="flex gap-1 mb-1">
              {openMultiSelect ? (
                <>
                  <button
                    type="button"
                    disabled={disableBtn}
                    onClick={() => setOpenModal(true)}
                    className={`text-[10px] px-3 rounded-md text-white ${
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
                    className="text-[10px] px-3 rounded-md bg-gray-500 text-white"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckedTodo(doneTodosIds);
                      setOpenMultiSelect(true);
                    }}
                    className="text-[10px] px-3 rounded-md bg-blue-500 text-white"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenMultiSelect(true)}
                    className="text-[10px] px-3 rounded-md bg-blue-500 text-white"
                  >
                    Select many
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* displaying todos */}
        <ul className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
          {doneTodos
            .filter(({ todo }) => todo.toLocaleLowerCase().includes(searchWord))
            .map(({ _id, todo, done, createdAt }) => (
              <li
                key={_id}
                className="flex justify-between border rounded-lg p-3 bg-green-100 hover:bg-green-200 transition-colors group"
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
                  {/* undo button */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleDone(_id, done);
                      toast.warning("Task back to progress!");
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
