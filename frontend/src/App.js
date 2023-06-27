import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="h-screen flex flex-col items-center">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
