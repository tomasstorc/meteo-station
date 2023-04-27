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
  Button,
  Grow,
  Popper,
  Stack,
} from "@mui/material";
import { getLogout } from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Paper
        className="d-lg-block d-none"
        sx={{ width: 250, maxWidth: "100%", height: "100vh" }}
      >
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
      <Stack
        direction="row"
        spacing={2}
        className="d-lg-none d-sm-block d-md-block"
      >
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MenuIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper
                  sx={{ width: "100vw", maxWidth: "100%", height: "100vh" }}
                >
                  <div className="d-flex justify-content-center py-3">
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
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </>
  );
}

export default Navigation;
