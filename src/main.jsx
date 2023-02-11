import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

// axios

axios.defaults.baseURL = "http://localhost:5500/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";
let token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;

// Routes
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
      <ToastContainer theme="colored" />
    </Provider>
  </Router>
);
