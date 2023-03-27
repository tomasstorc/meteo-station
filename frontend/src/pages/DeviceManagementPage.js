import { Container, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceManagementTable from "../components/DeviceManagementTable";
import EditForm from "../components/EditForm";
import Navigation from "../components/Navigation";
import { getDevices } from "../redux/devicesSlice";
import { parseToken } from "../redux/loginSlice";
import AddIcon from "@mui/icons-material/Add";

const DeviceManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { allDevices, loading } = useSelector((state) => state.devices);
  useEffect(() => {
    dispatch(parseToken());
    dispatch(getDevices(token));
  }, [dispatch, token]);
  console.log(allDevices);
  if (loading) return "loading...";
  return (
    <div className="row">
      <Navigation className="col" />
      <Container className="col mt-3">
        <Typography variant="h4"> Device management</Typography>
        <div className="d-flex justify-content-end ">
          <Button
            variant="contained"
            onClick={() => {
              setOpen(!open);
              setAdd(true);
            }}
          >
            <AddIcon /> Add device
          </Button>
        </div>
        <DeviceManagementTable handleOpen={handleOpen} data={allDevices} />
      </Container>
      <EditForm open={open} onClose={setOpen} add={add} setAdd={setAdd} />
    </div>
  );
};

export default DeviceManagementPage;
