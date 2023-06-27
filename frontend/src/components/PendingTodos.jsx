import React from "react";
import useZustandStore from "../store/ZustandStore";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function PendingTodos() {
  const { getTodos, deleteTodo, toggleTodo, todos } = useZustandStore();
  const pendingTodos = todos.filter((todo) => todo.completed !== true);

  return (
    <div className="flex flex-col gap-5 pb-5 overflow-y-auto">
      <h1 className="border-b-2 border-yellow-500 bg-white sticky top-0">
        Pending ({pendingTodos.length})
      </h1>

      <ul className="flex flex-col gap-2">
        {pendingTodos.map(({ _id, todo, completed }) => (
          <li
            key={_id}
            className="flex justify-between border rounded-lg p-3 bg-yellow-100 hover:bg-yellow-200 transition-opacity group"
          >
            <div className="w-full overflow-hidden break-words">
              <p>{todo}</p>
            </div>
            {/* buttons */}
            <div className="flex">
              <button
                type="button"
                onClick={() => toggleTodo(_id, completed)}
                className="text-gray-500 hover:text-green-500 ml-5 transition-all"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <AiOutlineCheckCircle size={25} />
                </span>
              </button>
              <button
                type="button"
                onClick={() => deleteTodo(_id, pendingTodos)}
                className="text-gray-500 hover:text-red-500 ml-5 transition-all"
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
  );
}
