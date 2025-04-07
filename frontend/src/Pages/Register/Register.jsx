import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from "axios";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const [role, setRole] = useState("user");
  const [values, setValues] = useState({
    key: "",
    fullName: "",
    email: "",
    password: "",
    confPassword: "",
    role: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState("bi bi-eye-slash");
  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
    setShowIcon(showPassword ? "bi bi-eye" : "bi bi-eye-slash");
  };

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: role,
      })
      .then((res) => {
        if (res.data.Status == "Success") {
          toast.success("Register Success!!");
          navigate("/login");
        } else {
          toast.error(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = (e) => {
    e.preventDefault();
    const newErrors = Validation(values);
    setErrors(newErrors);
    if (role === "admin" && errors.key) {
      toast.error(errors.key);
    } else if (
      errors.fullName == "" &&
      errors.email == "" &&
      errors.password == "" &&
      errors.confPassword == "" &&
      errors.key == "" &&
      role == "admin"
    ) {
      register();
    } else if (
      errors.fullName == "" &&
      errors.email == "" &&
      errors.password == "" &&
      errors.confPassword == "" &&
      role == "user"
    ) {
      register();
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        {/* Full Name Input */}
        <div className="input-area">
          <div className="checkbox-wrapper">
            <h3>Sign in As:</h3>
            <div className="checkbox-admin">
              <label>
                <input
                  style={{ cursor: "pointer", padding: "2px" }}
                  type="checkbox"
                  name="admin"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                <span>Admin</span>
              </label>
            </div>
            <div className="checkbox-admin">
              <label>
                <input
                  style={{ cursor: "pointer", padding: "2px" }}
                  name="user"
                  value="user"
                  type="checkbox"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                <span>User</span>
              </label>
            </div>
          </div>
          {/* Secret Key Input */}
          {role == "admin" && (
            <div>
              <label htmlFor="key">Secret Key:</label>
              <br></br>
              <input
                name="key"
                placeholder="Enter Secret Key..."
                className="input-secret-key"
                value={values.key}
                onChange={handleChange}
              />
              {errors.key && <div className="error-message">{errors.key}</div>}
            </div>
          )}
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <br></br>
            <input
              name="fullName"
              className="input-name"
              placeholder="Enter name..."
              onChange={handleChange}
              value={values.fullName}
            />
            {errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>
          {/* Email Input */}
          <div>
            <label htmlFor="email">Email:</label>
            <br></br>
            <input
              className="input-email"
              name="email"
              placeholder="Enter email..."
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          {/* Password Input */}
          <div>
            <InputLabel
              shrink
              sx={{ color: "white", fontSize: "larger", fontWeight: "bold" }}
              htmlFor="outlined-adornment-password"
            >
              Password:
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              placeholder="Enter password..."
              onChange={handleChange}
              name="password"
              sx={{ backgroundColor: "white" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          {/* Confirm Password Input */}
          <div>
            <InputLabel
              shrink
              sx={{ color: "white", fontSize: "larger", fontWeight: "bold" }}
              htmlFor="outlined-adornment-password"
            >
              Confirm Password:
            </InputLabel>
            <OutlinedInput
              fullWidth
              type={showPassword ? "text" : "password"}
              value={values.confPassword}
              placeholder="Enter confirm password..."
              onChange={handleChange}
              name="confPassword"
              sx={{ backgroundColor: "white" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.confPassword && (
              <div className="error-message">{errors.confPassword}</div>
            )}
          </div>
        </div>
        <Link id="link" to="/login">
          Already have an account ?
        </Link>
        <button id="register-btn" onClick={submit}>
          Create a Account
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
