import React, { useRef } from "react";
import useZustandStore from "../store/ZustandStore";
import { useTranslation } from "react-i18next";

export default function SearchBar({ setSearchWord }) {
  const { todos } = useZustandStore();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const includes = todos.some(({ todo }) =>
    todo.toLocaleLowerCase().includes(inputRef.current?.value)
  );

  return (
    <div className="rounded-full shadow-md">
      <input
        ref={inputRef}
        type="text"
        placeholder={t("addTodo.search")}
        className={`text-sm px-4 py-2 w-full rounded-full ring-1 ring-gray-300 outline-none focus:shadow-lg transition-shadow ${
          includes ? "focus:ring-blue-500" : "focus:ring-red-500"
        }`}
        onChange={() => setSearchWord(inputRef.current?.value)}
      />
    </div>
  );
}
