import React, { useRef } from "react";
import useZustandStore from "../store/ZustandStore";

export default function SearchBar({ setSearchWord }) {
  const { todos } = useZustandStore();
  const inputRef = useRef(null);
  const includes = todos.some(({ todo }) =>
    todo.includes(inputRef.current?.value)
  );

  return (
    <div className="rounded-full shadow-md">
      <input
        ref={inputRef}
        type="text"
        placeholder="Find task..."
        className={`text-sm px-4 py-2 w-full rounded-full ring-1 ring-gray-300 outline-none focus:shadow-lg transition-shadow ${
          includes ? "focus:ring-blue-500" : "focus:ring-red-500"
        }`}
        onChange={() => setSearchWord(inputRef.current?.value)}
      />
    </div>
  );
}
