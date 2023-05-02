import { Container, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceManagementTable from "../components/DeviceManagementTable";
import EditForm from "../components/EditForm";
import Navigation from "../components/Navigation";
import { getDevices, getUsers } from "../redux/devicesSlice";
import { parseToken } from "../redux/loginSlice";
import AddIcon from "@mui/icons-material/Add";

const DeviceManagementPage = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { allDevices, users } = useSelector((state) => state.devices);

  useEffect(() => {
    dispatch(parseToken());
    dispatch(getDevices(token));
    dispatch(getUsers(token));
  }, [dispatch, token]);

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
            }}
          >
            <AddIcon /> Add device
          </Button>
        </div>
        <DeviceManagementTable
          data={allDevices}
          users={users}
          token={token}
          username={user?.username}
        />
      </Container>
      <EditForm open={open} onClose={setOpen} users={users} />
    </div>
  );
};

export default DeviceManagementPage;
