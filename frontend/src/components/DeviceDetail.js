import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSelector } from "react-redux";

export default function DeviceDetail({ open, onClose }) {
  const { dataDetail } = useSelector((state) => state.devices);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xl"}
      >
        <DialogTitle id="alert-dialog-title">Device detail</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Device name: {dataDetail?.name}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Owner: {dataDetail?.owner}
          </DialogContentText>{" "}
          {dataDetail?.users?.length !== 0 && (
            <DialogContentText id="alert-dialog-description">
              Members: {dataDetail?.users?.join(",")}
            </DialogContentText>
          )}{" "}
          <DialogContentText id="alert-dialog-description">
            Api key: {dataDetail?.key}
          </DialogContentText>{" "}
          <DialogContentText id="alert-dialog-description">
            Device id: {dataDetail?._id}
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
