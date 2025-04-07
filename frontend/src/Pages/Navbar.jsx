import { Link } from "react-router-dom";
import "./Home/home.css";
import React, { useContext } from "react";
import UserDropDown from "./User/UserDropDown";
import UserSignInContext from "./Contexts/UserSignInContext";

export default function Navbar() {
  // const { auth, handleLogout, name } = props;
  const userInfo = useContext(UserSignInContext);
  return (
    <div className="nav-section">
      <div className="navbar">
        <div>
          <h1>Bao Anh</h1>
        </div>
        <div>
          {userInfo.auth && (
            <>
              <div className="user-section">
                <UserDropDown
                  name={userInfo.name}
                  handleLogout={userInfo.handleLogout}
                ></UserDropDown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
