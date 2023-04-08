import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LogoutIcon from "@mui/icons-material/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Link,
} from "@mui/material";
import { getLogout } from "../redux/loginSlice";
import { useDispatch } from "react-redux";

function Navigation() {
  const dispatch = useDispatch();

  return (
    <Paper sx={{ width: 250, maxWidth: "100%", height: "100vh" }}>
      <div className="d-flex justify-content-center my-2">
        {" "}
        <Avatar src="/broken-image.jpg" />
      </div>

      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link href="/" underline="none" color="inherit">
            <ListItemText>All devices</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DevicesOtherIcon />
          </ListItemIcon>
          <Link href="/devices" underline="none" color="inherit">
            <ListItemText>Devices management</ListItemText>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Link underline="none" href={"/login"} color="inherit">
            <ListItemText
              onClick={() => {
                dispatch(getLogout());
              }}
            >
              Logout
            </ListItemText>
          </Link>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default Navigation;
