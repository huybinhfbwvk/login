import React from "react";
import "./index.css";
import App from "./App";
import store from "./store";

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
<<<<<<< HEAD
    <App />
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> 8884e583758db037b04ea12cf573805c0e2662b2
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
