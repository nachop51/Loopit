import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import reducers from "./reducers";

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);

const store = configureStore({
  reducer: reducers,
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
