import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";

const DeviceManagementTable = ({ data, users }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const [deviceData, setDeviceData] = useState({
    id: "",
    name: "",
    members: [],
  });

  const columns = [
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
