import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from "./scenes/dashboard/global/Sidebar";
import Topbar from "./scenes/dashboard/global/Topbar";
import Dashboard from "./scenes/dashboard/index";

import Header from "./components/Header";
import Subproject from "./scenes/Subproject";
import ProjectsList from "./scenes/ProjectsList";
 // Import the ProductForm component
const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
};
function App({ onLogout }) {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const getHeaderTitle = () => {
    const path = location.pathname.split('/').pop();
    switch(path) {
      case 'dashboard': return 'DASHBOARD';
      case 'projects-list': return 'PROJECTS LIST';
      
      case 'subproject': return 'ADD PROJECT';
       // Add this case
      default: return 'DASHBOARD';
    }
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={styles.app}>
          <Topbar />
          <Header title={getHeaderTitle()}  />
          <div style={styles.contentWrapper}>
            <Sidebar onLogout={onLogout} />
            <main style={styles.mainContent}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects-list" element={<ProjectsList />} />
              
                <Route path="subproject" element={<Subproject />} />
                
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;