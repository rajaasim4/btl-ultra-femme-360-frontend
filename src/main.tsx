import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TagManager from "react-gtm-module";
import { GTM_ID } from "./utils/CONSTS.ts";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin.tsx";
import Login from "./Pages/Login.tsx";
import { LoginRoute, ProtectedRoute } from "./components/ProtectedRoute.tsx";

const tagManagerArgs = {
  gtmId: GTM_ID,
};

TagManager.initialize(tagManagerArgs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
