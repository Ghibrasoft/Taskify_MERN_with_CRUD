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
      const res = await axios.put(`http://localhost:3001/todos/${id}`, {
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
  togglePending: async (id, pending) => {
    try {
      await axios.put(
        `http://localhost:3001/todos/${id}/${
          pending ? "inprogress" : "pending"
        }`
      );

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, pending: !pending } : todo
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  toggleDone: async (id, done) => {
    try {
      await axios.put(
        `http://localhost:3001/todos/${id}/${done ? "undo" : "done"}`
      );

      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, done: !done } : todo
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteTodo: async (ids, todoList) => {
    try {
      await axios.delete("http://localhost:3001/todos", { data: { ids } });

      const filteredTodos = todoList.filter((todo) => !ids.includes(todo._id));
      set({ todos: filteredTodos });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useZustandStore;
