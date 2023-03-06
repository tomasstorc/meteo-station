import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parseToken } from "../redux/loginSlice";
import { Navigate } from "react-router-dom";
import DashboardItem from "../components/DashboardItem";
import { Container, Typography } from "@mui/material";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(parseToken());
  }, [dispatch]);

  return (
    <div className="row">
      <Navigation className="col" />
      <Container className="col mt-3">
        <Typography variant="h4"> Dashboard</Typography>

        <DashboardItem name={"Thermometer - kitchen"} data="23°C" />
        {!user && <Navigate replace to={"/login"} />}
      </Container>
    </div>
  );
};

export default Dashboard;
