import React, { useEffect, useState } from "react";
import { getData } from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { parseToken } from "../redux/loginSlice";
import { useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { data } = useSelector((state) => state.data);
  const { id } = useParams();

  const [parameters, setParameters] = useState({
    granularity: 5,
    dateFrom: new Date(Date.now() - 1000 * (60 * 60)).toISOString(),
    dateTo: new Date().toISOString(),
  });
  useEffect(() => {
    dispatch(parseToken());
    let payload = {
      id: id,
      token: token,
      granularity: parameters.granularity,
      dateFrom: parameters.dateFrom,
      dateTo: parameters.dateTo,
    };
    dispatch(getData(payload));
  }, [
    dispatch,
    token,
    id,
    parameters.granularity,
    parameters.dateFrom,
    parameters.dateTo,
  ]);
  console.log(data);

  return (
    <div className="row">
      <Navigation className="col" />
      <Container className="col mt-3">
        <Typography variant="h4"> Dashboard</Typography>
        <div className="row">
          <div className="col">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="granularity">Data granularity</InputLabel>
              <Select
                onChange={(e) => {
                  setParameters({
                    granularity: e.target.value,
                    dateFrom: parameters.dateFrom,
                    dateTo: parameters.dateTo,
                  });
                }}
                id="granularity"
                value={parameters.granularity}
                name="granularity"
                label="Data granularity"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="d-flex justify-content-end col">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileDateTimePicker", "MobileDateTimePicker"]}
              >
                <MobileDateTimePicker
                  label={`Date and time from`}
                  openTo="year"
                  name="dateFrom"
                  onChange={(e) => {
                    setParameters({
                      granularity: parameters.granularity,
                      dateFrom: e.$d.toISOString(),
                      dateTo: parameters.dateTo,
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileDateTimePicker", "MobileDateTimePicker"]}
              >
                <MobileDateTimePicker
                  label={`Date and time to`}
                  openTo="year"
                  name="dateTo"
                  onChange={(e) => {
                    setParameters({
                      granularity: parameters.granularity,
                      dateFrom: parameters.dateFrom,
                      dateTo: e.$d.toISOString(),
                    });
                  }}
                  // value={parameters.dateTo}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
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
        />
      </Container>
    </div>
  );
};

export default Dashboard;
