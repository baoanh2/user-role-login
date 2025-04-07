import React, { useContext, useState } from "react";
import "../Home/home.css";
import { Link } from "react-router-dom";
import UserSignInContext from "../Contexts/UserSignInContext";
import {
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Menu,
} from "@mui/material";
export default function UserDropDown() {
  const userInfo = useContext(UserSignInContext);
  // const [isDropped, setIsDropped] = useState(false);
  // const toggleDropDown = () => {
  //   setIsDropped(!isDropped);
  // };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="dropdown">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ textTransform: "none", color: "white", fontSize: "large" }}
        >
          <i className="bi bi-person-fill"></i>
          {userInfo.name}
          <i className="bi bi-caret-down-fill"></i>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/user-panel">Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <button onClick={userInfo.handleLogout}>Logout</button>
          </MenuItem>
        </Menu>
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          <MenuItem selected onClick={toggleDropDown}>
            <button className="dropdown-btn">
              <i className="bi bi-person-fill"></i>
              {userInfo.name}
              <i className="bi bi-caret-down-fill"></i>
            </button>
          </MenuItem>
          {isDropped ? (
            <ul className="menu">
              <li className="menu-item">
                <Link to="/user-panel">Profile</Link>
              </li>
              <li className="menu-item">
                <button onClick={userInfo.handleLogout}>Logout</button>
              </li>
            </ul>
          ) : null}
        </Select> */}
        {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <button className="dropdown-btn" onClick={toggleDropDown}>
          <i className="bi bi-person-fill"></i>
          {userInfo.name}
          <i className="bi bi-caret-down-fill"></i>
        </button>
        {isDropped ? (
          <ul className="menu">
            <li className="menu-item">
              <Link to="/user-panel">Profile</Link>
            </li>
            <li className="menu-item">
              <button onClick={userInfo.handleLogout}>Logout</button>
            </li>
          </ul>
        ) : null} */}
      </div>
    </div>
  );
}
