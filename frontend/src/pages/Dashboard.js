import React, { useEffect } from "react";
import { getData } from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { parseToken } from "../redux/loginSlice";
import { useParams } from "react-router-dom";
import {
  XAxis,
  YAxis,
  AreaChart,
  CartesianGrid,
  Tooltip,
  Area,
  LineChart,
  Legend,
  Line,
} from "recharts";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { data } = useSelector((state) => state.data);
  const { id } = useParams();
  useEffect(() => {
    dispatch(parseToken());
    let payload = {
      id: id,
      token: token,
    };
    dispatch(getData(payload));
  }, [dispatch, token, id]);
  console.log(data);

  return (
    <div className="row">
      {/* Dashboard Teplota
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFA503" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFA503" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="temperature"
          stroke="#FFA503"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      Vlhkost
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#145FF4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#145FF4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="humidity"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart> */}
      <Navigation className="col" />
      <div className="col">
        Dashboard
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="temperature" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="temperature" stroke="#FE6102" />
        </LineChart>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="humidity" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="humidity" stroke="#145FF4" />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
