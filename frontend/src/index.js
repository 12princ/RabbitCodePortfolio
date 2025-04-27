import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App"; // Main user application
import AdminApp from "./Admin/App"; // Admin panel application
import AdminLogin from "./Admin/scenes/Login"; // Admin login
import Dashboard from "./Admin/App";

import ProjectsList from "./Admin/scenes/ProjectsList";
import Subproject from "./Admin/scenes/Subproject";
import ProductPage from "./components/ProductPage";
import AllProjectsPage from "./components/AllProjects"; // Import new component for all projects

function RootApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* User side */}
        <Route path="/*" element={<App />} />
        {/* Admin login */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )
          }
        />
        {/* Admin dashboard */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? (
              <AdminApp onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subproject" element={<Subproject />} />
        <Route path="projects-list" element={<ProjectsList />} />
        <Route path="/project/:id" element={<ProductPage />} />
        {/* New dynamic route for individual projects */}
        <Route path="/all-projects" element={<AllProjectsPage />} />{" "}
        {/* New route */}
      </Routes>
    </Router>
  );
}

// Use createRoot instead of ReactDOM.render
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
