import React, { useEffect, useState } from "react";
import PendingTodos from "./PendingTodos";
import useZustandStore from "../store/ZustandStore";
import InProgressTodos from "./InProgressTodos";
import DoneTodos from "./DoneTodos";
import SearchBar from "./SearchBar";
import { useCookies } from "react-cookie";

export default function TodoList() {
  const { getTodos } = useZustandStore();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    getTodos(window.localStorage.getItem("userID"), cookies, setCookies);
  }, [getTodos, cookies, setCookies]);

  return (
    <>
      <SearchBar setSearchWord={setSearchWord} />
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-[95%] my-5 grid lg:grid-cols-3 gap-y-10 gap-x-10 overflow-y-auto">
        <PendingTodos searchWord={searchWord} />
        <InProgressTodos searchWord={searchWord} />
        <DoneTodos searchWord={searchWord} />
      </div>
    </>
  );
}
