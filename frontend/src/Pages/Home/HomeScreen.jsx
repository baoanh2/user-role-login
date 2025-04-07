import React, { useContext, useState, useEffect } from "react";
import User from "../User/UserScreen";
import Unauthenticated from "./UnauthenticatedScreen";
import ClockLoader from "react-spinners/ClockLoader";
import Navbar from "../Navbar";
import Admin from "../Admin/Admin";
import UserSignInContext from "../Contexts/UserSignInContext";

export default function Home() {
  const userInfo = useContext(UserSignInContext);
  return (
    <>
      <div className="home-section">
        {userInfo.auth ? (
          <div style={{ height: "100%", backgroundColor: "whitesmoke" }}>
            {userInfo.role == "admin" && <Admin />}
            {userInfo.role == "user" && <User />}
          </div>
        ) : (
          <div style={{ height: "100%" }}>
            {!userInfo.role && <Unauthenticated />}
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
}
