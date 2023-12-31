import axios from "axios";
import { create } from "zustand";

const useZustandStore = create((set) => ({
  lightMode: JSON.parse(window.localStorage.getItem("lightMode")),
  setLightMode: () => {
    set((prevState) => {
      const mode = !prevState.lightMode;
      localStorage.setItem("lightMode", JSON.stringify(mode));
      return {
        lightMode: JSON.parse(window.localStorage.getItem("lightMode")),
      };
    });
  },
  language: window.localStorage.getItem("i18nextLng"),
  setLanguage: (selectedLanguage) => {
    set({ language: selectedLanguage });
  },

  // register/login
  currUser: {},
  getCurrUser: async (cookies) => {
    try {
      const res = await axios.get(
        "https://taskify-app.onrender.com/auth/user",
        {
          headers: { Authorization: cookies.access_token },
        }
      );
      set({ currUser: res.data });
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  registerUser: async (newUser) => {
    try {
      const { username, email, password } = newUser;
      const res = await axios.post(
        "https://taskify-app.onrender.com/auth/register",
        {
          username,
          email,
          password,
        }
      );

      return res;
    } catch (error) {
      // console.error(error);
      throw error; // re-throw the error
    }
  },
  loginUser: async (loginUser) => {
    try {
      const { username, password } = loginUser;
      const res = await axios.post(
        "https://taskify-app.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      return res;
    } catch (error) {
      // console.error(error);
      throw error; // re-throw the error
    }
  },
  updateProfileImg: async (imageURL, userID) => {
    try {
      const res = await axios.put(
        "https://taskify-app.onrender.com/auth/profileimage",
        {
          imageURL,
          userID,
        }
      );
      return res;
    } catch (error) {
      console.error(error);
      throw error; // re-throw the error
    }
  },
  changePassword: async (credentials) => {
    const { oldPass, newPass, userID } = credentials;
    try {
      const res = await axios.put(
        "https://taskify-app.onrender.com/auth/changepassword",
        {
          oldPass,
          newPass,
          userID,
        }
      );
      return res;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  },
  deleteUserAccount: async (userId) => {
    try {
      await axios.delete(`https://taskify-app.onrender.com/auth/${userId}`);
    } catch (error) {
      console.error(error);
    }
  },

  // tasks
  todos: [],
  getTodos: async (userOwner, cookies, setCookies) => {
    try {
      const res = await axios.get(
        `https://taskify-app.onrender.com/todos?userOwner=${userOwner}`,
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
      await axios.post("https://taskify-app.onrender.com/todos", {
        todo,
        userOwner,
      });
      useZustandStore.getState().getTodos(userOwner, cookies);
    } catch (error) {
      console.error(error);
    }
  },
  updateTodo: async (id, todos, editedTodo) => {
    try {
      const res = await axios.put(
        `https://taskify-app.onrender.com/todos/${id}`,
        {
          editedTodo,
        }
      );

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
        `https://taskify-app.onrender.com/todos/${id}/${
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
        `https://taskify-app.onrender.com/todos/${id}/${done ? "undo" : "done"}`
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
      await axios.delete("https://taskify-app.onrender.com/todos", {
        data: { ids },
      });

      const filteredTodos = todoList.filter((todo) => !ids.includes(todo._id));
      set({ todos: filteredTodos });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useZustandStore;
