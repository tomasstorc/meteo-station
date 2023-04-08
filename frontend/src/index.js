import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import DeviceManagementPage from "./pages/DeviceManagementPage";
import DevicesList from "./pages/DevicesList";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="/" element={<DevicesList />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/devices" element={<DeviceManagementPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
