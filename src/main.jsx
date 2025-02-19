import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Tab from "./views/tab.jsx";
import { MantineProvider } from "@mantine/core";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tab/:tabname" element={<Tab />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
