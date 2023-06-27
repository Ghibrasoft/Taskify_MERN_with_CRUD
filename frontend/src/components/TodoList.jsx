import React, { useEffect } from "react";
import PendingTodos from "./PendingTodos";
import DoneTodos from "./DoneTodos";
import useZustandStore from "../store/ZustandStore";

export default function TodoList() {
  const { getTodos, todos } = useZustandStore();

  useEffect(() => {
    console.log("useEffect Runs");
    getTodos();
  }, [getTodos]);
  return (
    <div className="w-3/4 my-5 grid grid-cols-2 gap-y-10 gap-x-20 overflow-y-auto">
      <PendingTodos />
      <DoneTodos />
    </div>
  );
}
