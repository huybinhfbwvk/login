import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomePage from "./homePage/HomePage";
import Login from "./login/Login";
import { redirect } from "react-router-dom";

function App() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  console.log(token);
  let checkToken;
  if (token === null) {
    checkToken = redirect("/login");
  }

  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/login" Component={Login} />
    </Routes>
  );
}

export default App;
