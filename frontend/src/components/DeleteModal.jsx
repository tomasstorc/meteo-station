import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { deleteDevice, getDevices } from "../redux/devicesSlice";

export default function DeleteModal({ open, onClose, deviceData }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  console.log(deviceData.id);
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          onClose(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete {deviceData.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo this action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              let payload = {
                id: deviceData.id,
                token,
              };
              dispatch(deleteDevice(payload));
              onClose(false);
              dispatch(getDevices(token));
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
