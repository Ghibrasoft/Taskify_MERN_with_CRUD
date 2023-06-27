import axios from "axios";
import { create } from "zustand";

const useZustandStore = create((set) => ({
  todos: [],
  addTodo: async (todo) => {
    try {
      await axios.post("http://localhost:3001/todos", { todo });
      useZustandStore.getState().getTodos();
    } catch (error) {
      console.error(error);
    }
  },
  getTodos: async () => {
    try {
      const res = await axios.get("http://localhost:3001/todos");
      set({ todos: res.data });
    } catch (error) {
      console.error(error);
    }
  },
  toggleTodo: async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:3001/todos/${id}/${completed ? "undo" : "done"}`
      );

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteTodo: async (id, todoList) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      const filteredTodos = todoList.filter((todo) => todo._id !== id);
      set({ todos: filteredTodos });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useZustandStore;
