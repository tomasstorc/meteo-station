import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Modal,
  Box,
  OutlinedInput,
  Button,
} from "@mui/material";
import { addDevice, getDevices, editDevice } from "../redux/devicesSlice";
import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function EditForm({ open, onClose, deviceData }) {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.login);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [member, setMember] = useState([]);
  const [data, setData] = useState({
    deviceName: deviceData ? deviceData?.name : "",
    members: deviceData ? deviceData?.users : [],
  });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMember(typeof value === "string" ? value.split(",") : value);

    setData({ deviceName: data.deviceName, members: event.target.value });
  };
  console.log(data.members);
  console.log(data.deviceName);
  console.log(deviceData?.name);
  useEffect(() => {
    setData({
      deviceName: deviceData?.name,
      members: deviceData?.users,
    });
  }, [deviceData]);
  return (
    <Modal open={open}>
      <Box sx={style}>
        {deviceData ? <h5>Edit device</h5> : <h5>Add device</h5>}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            onChange={(e) => {
              setData({ deviceName: e.target.value, members: data.members });
            }}
            id="standard-basic"
            label="Name"
            variant="outlined"
            name="deviceName"
            value={data.deviceName}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl className="my-2">
            <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={member}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Members" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {deviceData?.id === undefined ? (
          <Button
            variant="contained"
            onClick={() => {
              let payload = {
                body: {
                  name: data.deviceName,
                  users: data.members,
                },
                token,
              };
              dispatch(addDevice(payload));
              onClose(false);
              dispatch(getDevices(token));
            }}
          >
            Add device
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              let payload = {
                body: {
                  name: data.deviceName,
                  users: data.members,
                },
                id: deviceData.id,
                token,
              };
              dispatch(editDevice(payload));
              onClose(false);
              dispatch(getDevices(token));
            }}
          >
            Submit
          </Button>
        )}
        <Button
          variant="text"
          onClick={() => {
            onClose(false);
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
