import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (window.location.hostname === 'localhost') {
  root.render(
    <BrowserRouter>
      <Provider enableSystem={false}>
        <App />
      </Provider>
    </BrowserRouter>
  );
} else {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider enableSystem={false}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
