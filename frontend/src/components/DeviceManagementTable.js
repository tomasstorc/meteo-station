import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";
import DeviceDetail from "./DeviceDetail";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getDeviceDetail } from "../redux/devicesSlice";

const DeviceManagementTable = ({ data, users, token }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleOpenDetail = () => setOpenDetail(true);

  const [deviceData, setDeviceData] = useState({
    id: "",
    name: "",
    members: [],
  });
  console.log(openDetail);
  const columns = [
    {
      name: "Detail",
      selector: (row) => (
        <SearchIcon
          size={20}
          className="pointer"
          onClick={(e) => {
            e.preventDefault();
            let payload = {
              id: row._id,
              token,
            };
            dispatch(getDeviceDetail(payload));
            handleOpenDetail();
          }}
        />
      ),
      sortable: false,
      maxWidth: "10px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: false,
    },
    {
      name: "Members",
      selector: (row) => row.users.join(", "),
      sortable: false,
    },
    {
      name: "Edit",
      selector: (row) => (
        <ModeEditIcon
          size={20}
          className="pointer"
          onClick={() => {
            setDeviceData({
              id: row._id,
              name: row.name,
              members: row.users,
            });
            handleOpen();
          }}
        />
      ),
      sortable: false,
      maxWidth: "10px",
    },
    {
      name: "Delete",
      selector: (row) => (
        <DeleteIcon
          size={20}
          className="text-danger pointer"
          onClick={() => {
            setDeviceData({
              id: row._id,
              name: row.name,
              members: row.users,
            });
            handleOpenDelete();
          }}
        />
      ),
      sortable: false,
      maxWidth: "10px",
    },
  ];

  return (
    <>
      <DeviceDetail open={openDetail} onClose={setOpenDetail} />
      <EditForm
        open={open}
        onClose={setOpen}
        deviceData={deviceData}
        users={users}
      />
      <DeleteModal
        open={openDelete}
        onClose={setOpenDelete}
        deviceData={deviceData}
      />

      <DataTable
        className="mt-3"
        columns={columns}
        data={data}
        pagination="true"
      />
    </>
  );
};

export default DeviceManagementTable;
