import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  InputAdornment,
  Tab,
  Tabs,
  AppBar,
  Alert,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PasswordIcon from "@mui/icons-material/Password";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../redux/loginSlice";
import { createAccount } from "../redux/createAccountSlice";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [value, setValue] = useState(0);
  const [validate, setValidate] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleSign = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const { loading, user, errorMsg } = useSelector((state) => state.login);
  const { loadingNewAccount, errorMsg: errorMsg2 } = useSelector(
    (state) => state.createAccount
  );
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setValidate(validatePassword(value));
    }
    setLoginData({ ...loginData, [name]: value });
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z]).{6}/g;
    return re.test(password);
  };
  const handleSubmit = (e) => {
    if (value === 0) {
      dispatch(getLogin(loginData));
    } else {
      dispatch(createAccount(loginData))
        .unwrap()
        .then((payload) => {
          if (payload.status === "error") {
            setShowError(true);
          } else {
            setValue(0);
            setConfirm(true);
          }
        });
    }
  };

  if (loading || loadingNewAccount) return <CircularProgress />;
  console.log(user);

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
      {user && <Navigate replace to="/" />}
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
        {showError && <Alert severity="error">{errorMsg || errorMsg2}</Alert>}
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
        {!validate && loginData.password.length > 1 && (
          <FormHelperText error>
            Password must contain minimum 6 characters, one upper case and one
            lower case
          </FormHelperText>
        )}
        <Button
          className="mt-2"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          {value === 0 ? "Sign in" : "Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
