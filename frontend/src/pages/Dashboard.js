import React, { useEffect, useState } from "react";
import { getData } from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { parseToken } from "../redux/loginSlice";
import { useParams } from "react-router-dom";

import Navigation from "../components/Navigation";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import GraphComponent from "../components/GraphComponent";
import Loading from "../components/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { data, loading, name, lastData } = useSelector((state) => state?.data);
  const { id } = useParams();
  const now = new Date();
  const [parameters, setParameters] = useState({
    granularity: 5,
    dateFrom: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      .toISOString()
      .split(".")[0],
    dateTo: new Date().toISOString().split(".")[0],
  });

  useEffect(() => {
    dispatch(parseToken());
    let payload = {
      id: id,
      token: token,
      granularity: parameters?.granularity,
      dateFrom: parameters?.dateFrom,
      dateTo: parameters?.dateTo,
    };
    dispatch(getData(payload));
  }, [
    dispatch,
    token,
    id,
    parameters?.granularity,
    parameters?.dateFrom,
    parameters?.dateTo,
  ]);

  if (loading) return <Loading />;
  return (
    <div className="row">
      <Navigation className="col" />
      <Container className="col mt-3">
        <Typography variant="h4"> Dashboard - {name}</Typography>
        <div className="row">
          <div className="col">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="granularity">Data granularity</InputLabel>
              <Select
                onChange={(e) => {
                  setParameters({
                    granularity: e.target.value,
                    dateFrom: parameters?.dateFrom,
                    dateTo: parameters?.dateTo,
                  });
                }}
                id="granularity"
                value={parameters?.granularity}
                name="granularity"
                label="Data granularity"
              >
                <MenuItem value={1}>1 minuta</MenuItem>
                <MenuItem value={5}>5 minut</MenuItem>
                <MenuItem value={10}>10 minut</MenuItem>
                <MenuItem value={30}>30 minut</MenuItem>
                <MenuItem value={60}>1 hodina</MenuItem>
                <MenuItem value={1440}>1 den</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="d-flex justify-content-end col">
            <div className="fieldset">
              <h1 className="legend">Date and time from</h1>

              <input
                labelId="demo-simple-select-disabled-label"
                className="date"
                id="dateFrom"
                label="Date and time from"
                name="dateFrom"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={parameters?.dateFrom}
                onChange={(e) => {
                  setParameters({
                    granularity: parameters?.granularity,
                    dateFrom: e.target.value,
                    dateTo: parameters?.dateTo,
                  });
                }}
                max={parameters?.dateTo}
              />
            </div>

            <div className="fieldset">
              <h1 className="legend">Date and time to</h1>

              <input
                labelId="demo-simple-select-disabled-label"
                className="date"
                id="dateTo"
                label="Date and time to"
                name="dateTo"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={parameters?.dateTo}
                onChange={(e) => {
                  setParameters({
                    granularity: parameters?.granularity,
                    dateFrom: parameters?.dateFrom,
                    dateTo: e.target.value,
                  });
                }}
                min={parameters?.dateFrom}
                max={new Date().toISOString().split(".")[0]}
              />
            </div>
          </div>
        </div>
        Aktuální teplota: {lastData?.temperature}°C Aktuální vlhkost:{" "}
        {lastData?.humidity}%
        {data?.length === 0 || data === undefined ? (
          <div className="text-center bg-white p-3 mt-3">
            There are no records to display
          </div>
        ) : (
          <>
            <GraphComponent
              name={"Temperature"}
              color={"#FFA503"}
              data={data}
              type="temperature"
            />
            <GraphComponent
              name={"Humidity"}
              color={"#145FF4"}
              data={data}
              type="humidity"
            />{" "}
          </>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
