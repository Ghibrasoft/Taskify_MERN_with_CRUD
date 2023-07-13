import React, { useRef, useState } from "react";
import useZustandStore from "../store/ZustandStore";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useCookies } from "react-cookie";

export default function AddTodo() {
  const inputRef = useRef(null);
  const [todo, setTodo] = useState("");
  const [cookies, _] = useCookies(["access_token"]);
  const { addTodo, lightMode } = useZustandStore();

  async function submitHandler(e) {
    e.preventDefault();
    const userID = window.localStorage.getItem("userID");
    try {
      if (todo.trim() !== "") {
        addTodo(todo, userID, cookies);
        toast.success("Task added successfully!");
      } else {
        toast.warn("Empty task not allowed!");
      }
      setTodo("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col items-center w-full mt-20">
      <h1
        className={`title-h1 text-center mb-5 text-5xl sm:text-7xl w-full ${
          !lightMode && "title-h1 text-white"
        }`}
      >
        Taskify
      </h1>
      <form onSubmit={submitHandler} className="md:w-2/5">
        <div className="my-5 flex w-full rounded-full shadow-lg">
          <input
            ref={inputRef}
            type="text"
            name="todo"
            placeholder="Add task..."
            value={todo}
            onChange={() => setTodo(inputRef.current.value)}
            required
            className="px-4 py-2 w-full rounded-l-full ring-1 ring-blue-500 outline-none focus:ring-blue-700 focus:shadow-lg transition-shadow"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-3 rounded-r-full text-white bg-blue-500 ring-1 ring-blue-500 hover:px-5 hover:ring-blue-700 hover:bg-blue-700 active:ring-offset-2 transition-all group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              <AiOutlinePlusCircle size={25} />
            </span>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
