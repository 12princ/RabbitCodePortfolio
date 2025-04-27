import React, { useState, useEffect } from "react";
import { Sidebar as MySidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link, useNavigate } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const handleClick = () => {
    setSelected(title);
    if (onClick) onClick();
  };
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={handleClick}
      icon={icon}
      component={to ? <Link to={to} /> : undefined}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  // Add effect to prevent back navigation when not authenticated
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    const handlePopState = (event) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        window.history.pushState(null, null, '/home');
        navigate('/home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    // Clear any other stored data if needed
    // localStorage.clear(); // Use this if you want to clear all localStorage data
    
    // Replace the current history entry and navigate to 
    window.history.replaceState(null, '', '/home');
    navigate('/AdminLogin', { replace: true });
    
    // Add entry to prevent going back
    window.history.pushState(null, '', '/home');
  };

  return (
    <div className="sidebar">
      <Box>
        <MySidebar collapsed={isCollapsed}>
          <Menu>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Projects"
              to="/admin/subproject"
              icon={<AddPhotoAlternateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Projects"
              to="/admin/projects-list"
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Log Out"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={handleLogout}
            />
          </Menu>
        </MySidebar>
      </Box>
    </div>
  );
}

export default Sidebar;