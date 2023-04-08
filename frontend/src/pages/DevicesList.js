import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parseToken } from "../redux/loginSlice";
import { Navigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Navigation from "../components/Navigation";
import { getDevices } from "../redux/devicesSlice";
import DeviceItem from "../components/DeviceItem";

const DevicesList = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.login);
  const { allDevices } = useSelector((state) => state.devices);
  useEffect(() => {
    dispatch(parseToken());
    dispatch(getDevices(token));
  }, [dispatch, token]);

  return (
    <div className="row">
      <Navigation className="col" />
      <Container className="col mt-3">
        <Typography variant="h4"> All devices</Typography>
        <div className="row">
          {allDevices?.map((d) => {
            return <DeviceItem name={d.name} data="23°C" id={d._id} />;
          })}
        </div>
        {!user && <Navigate replace to={"/login"} />}
      </Container>
    </div>
  );
};

export default DevicesList;