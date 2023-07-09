import axios from "axios";
import { create } from "zustand";

const useZustandStore = create((set) => ({
  // register/login
  currUser: {
    username: "",
  },
  getCurrUser: async () => {},
  registerUser: async (newUser) => {
    try {
      const { username, password } = newUser;
      const res = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  loginUser: async (loginUser) => {
    try {
      const { username, password } = loginUser;
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      return res;
    } catch (error) {
      console.error(error);
      set({ authenticated: false });
    }
  },

  // tasks
  todos: [],
  getTodos: async (userOwner, cookies, setCookies) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/todos?userOwner=${userOwner}`,
        { headers: { Authorization: cookies.access_token } }
      );
      set({ todos: res.data });
    } catch (error) {
      if (error.response.status === 403) {
        window.localStorage.removeItem("userID");
        setCookies("access_token", "");
        window.location.href = "/login";
      } else {
        console.error(error);
      }
    }
  },
  addTodo: async (todo, userOwner, cookies) => {
    try {
      await axios.post("http://localhost:3001/todos", { todo, userOwner });
      useZustandStore.getState().getTodos(userOwner, cookies);
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
