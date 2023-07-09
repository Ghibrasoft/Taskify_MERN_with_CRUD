import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          {cookies.access_token && (
            <>
              <Route path={"/mainpage"} element={<MainPage />} />
              <Route path={"/profile"} element={<UserProfile />} />
            </>
          )}
          {/* catch all routes */}
          <Route path={"*"} element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
