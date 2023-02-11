import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Routes
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
