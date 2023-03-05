import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  InputAdornment,
  Tab,
  Tabs,
  AppBar,
  Skeleton,
  Alert,
  CircularProgress,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PasswordIcon from "@mui/icons-material/Password";

import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../redux/loginSlice";
import { createAccount } from "../redux/createAccountSlice";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [value, setValue] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const handleSign = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.login);
  const { loadingNewAccount } = useSelector((state) => state.createAccount);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = () => {
    if (value === 0) {
      console.log(loginData);
      dispatch(getLogin(loginData));
    } else {
      dispatch(createAccount(loginData));
      setValue(0);
      setConfirm(true);
    }
  };

  if (loading || loadingNewAccount) return <CircularProgress />;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundSize: "100vw",
        backgroundImage: `url("https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255, 0.7)",
          padding: "5rem",
          borderRadius: "10px",
        }}
      >
        <AppBar position="static" color="default" className="mb-2">
          <Tabs
            value={value}
            onChange={handleSign}
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Sign in" />
            <Tab label="Sign up" />
          </Tabs>
        </AppBar>
        {confirm && (
          <Alert severity="success">
            Your account was successfully created! Now you can sign in
          </Alert>
        )}
        <TextField
          onChange={handleChange}
          className="d-flex align-items-center justify-content-center"
          fullWidth
          value={loginData.username}
          name="username"
          label="User"
          id="standard-start-adornment"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField
          onChange={handleChange}
          fullWidth
          value={loginData.password}
          name="password"
          label="Password"
          type="password"
          id="standard-start-adornment"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <Button
          className="mt-2"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          {value === 0 ? "Sign in" : "Sign up"}
        </Button>
      </div>
      {user && <Navigate to="/" />}
    </div>
  );
};

export default LoginPage;
