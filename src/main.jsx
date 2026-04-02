import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { store } from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "999px",
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid rgba(148, 163, 184, 0.3)",
          },
        }}
      />
    </Provider>
  </BrowserRouter>
);
