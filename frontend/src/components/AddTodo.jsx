import React, { useRef, useState } from "react";
import useZustandStore from "../store/ZustandStore";

export default function AddTodo() {
  const inputRef = useRef(null);
  const [todo, setTodo] = useState("");
  const { addTodo } = useZustandStore();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      addTodo(todo);
      setTodo("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col items-center w-full mt-20 sticky top-20">
      <h1 className="title-h1 text-center mb-5 text-7xl w-full">Taskify</h1>
      <form onSubmit={submitHandler} className="w-2/5">
        <div className="my-5 flex w-full rounded-full shadow-lg">
          <input
            ref={inputRef}
            type="text"
            name="todo"
            placeholder="Add task..."
            value={todo}
            onChange={() => setTodo(inputRef.current.value)}
            className="px-4 py-2 w-full rounded-l-full ring-1 ring-blue-500 outline-none focus:ring-blue-700 focus:shadow-lg transition-all"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-3 rounded-r-full text-white bg-blue-500 ring-1 ring-blue-500 hover:px-5 hover:ring-blue-700 hover:bg-blue-700 active:ring-offset-2 transition-all group"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
