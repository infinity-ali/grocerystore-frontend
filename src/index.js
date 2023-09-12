import "./bootstrap-custom.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { HashRouter as Router } from "react-router-dom";
import AppProvider from "./Authentication/AppProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import 'react-notifications/lib/notifications.css';

library.add(fas, far, fab);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    {/* <AppProvider> */}
    <Router>
      <App />
    </Router>
    {/* </AppProvider> */}
    </React.StrictMode>
  </Provider>
);
