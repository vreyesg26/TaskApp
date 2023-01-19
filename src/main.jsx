import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskContextProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskContextProvider>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position="top-center"
      />
      <App />
    </TaskContextProvider>
  </React.StrictMode>
);
