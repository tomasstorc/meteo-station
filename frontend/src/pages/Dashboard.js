import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parseToken } from "../redux/loginSlice";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(parseToken());
  }, [dispatch]);

  return (
    <div>
      Dashboard
      {!user && <Navigate replace to={"/login"} />}
    </div>
  );
};

export default Dashboard;
