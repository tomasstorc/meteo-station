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
  useEffect(() => {
    dispatch(parseToken());
    let payload = {
      id: id,
      token: token,
    };
    dispatch(getData(payload));
  }, [dispatch, token, id]);
  console.log(data);
  const [dataGranularity, setDataGranularity] = useState("");

  const handleChange = (event) => {
    setDataGranularity(event.target.value);
  };
  return (
    <div className="row">
      <Navigation className="col" />
      <Container className="col mt-3">
        <Typography variant="h4"> Dashboard</Typography>
        <div className="row">
          <div className="col">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="data-granularity">Data granularity</InputLabel>
              <Select
                onChange={handleChange}
                id="data-granularity"
                value={dataGranularity}
                label="Data granularity"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
