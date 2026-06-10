import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

// Create a client instance for TanStack Query
const queryClient = new QueryClient();

// We mount the React application at the root DOM node
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter handles browser URL mapping and SPA navigation */}
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        {/* ThemeProvider distributes dark/light mode states */}
        <ThemeProvider>
          {/* UserProvider fetches and distributes the mock user profiles */}
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
