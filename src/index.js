import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QuizProvider } from "../src/pages/store/context";
import store from "./redux/store";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Router>
        <QuizProvider>
          <App />
        </QuizProvider>
      </Router>
    </Provider>
  </>
);
