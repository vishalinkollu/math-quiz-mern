import React from "react";
import Quiz from "./components/Quiz";
import "./styles/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <h1 className="title">⚡ Math Battle Arena</h1>
      <Quiz />

      {/* ✅ Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </div>
  );
}

export default App;