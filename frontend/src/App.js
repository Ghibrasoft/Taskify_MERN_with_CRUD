import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="h-screen flex flex-col items-center">
        <AddTodo />
        <TodoList />
      </div>
    </>
  );
}

export default App;
