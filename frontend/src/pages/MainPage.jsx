import React, { useEffect } from "react";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import { useCookies } from "react-cookie";
import useZustandStore from "../store/ZustandStore";

export default function MainPage() {
  const [cookies, _] = useCookies(["access_token"]);
  const { getCurrUser } = useZustandStore();

  useEffect(() => {
    getCurrUser(cookies);
  }, [getCurrUser, cookies]);

  return (
    <div className="flex flex-col items-center my-20">
      <AddTodo />
      <TodoList />
    </div>
  );
}
