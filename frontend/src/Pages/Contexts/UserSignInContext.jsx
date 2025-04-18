import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const UserSignInContext = createContext();
export const UserSignInProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          setAuth(true);
          setId(res.data.id);
          setName(res.data.name);
          setEmail(res.data.email);
          setRole(res.data.role);
          localStorage.setItem("userid", res.data.id);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("role", res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);
  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        location.reload(true);
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <UserSignInContext.Provider
      value={{ handleLogout, name, id, email, role, auth }}
    >
      {children}
    </UserSignInContext.Provider>
  );
};

export default UserSignInContext;
