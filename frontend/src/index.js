import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import App from "./components/App";
import { store } from "./store/store";

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);

root.render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#313131" highlightColor="#525252" height={20}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SkeletonTheme>
  </Provider>
);
