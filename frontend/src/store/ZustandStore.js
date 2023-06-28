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
  updateTodo: async (id, todos, editedTodo) => {
    try {
      const res = axios.put(`http://localhost:3001/todos/${id}`, {
        editedTodo,
      });

      // create new object if ID matches , if not return old
      const updatedTodo = todos.map((todo) =>
        todo._id === id ? { ...todo, ...res.data } : todo
      );

      set({ todo: updatedTodo });
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
