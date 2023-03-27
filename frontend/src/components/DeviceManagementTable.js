import React from "react";
import DataTable from "react-data-table-component";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const DeviceManagementTable = ({ handleOpen, data }) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Members",
      selector: (row) => row.users,
      sortable: false,
    },
    {
      name: "Edit",
      selector: (row) => (
        <ModeEditIcon
          size={20}
          className="pointer"
          onClick={() => {
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
        <DeleteIcon size={20} className="text-danger pointer" />
      ),
      sortable: false,
      maxWidth: "10px",
    },
  ];

  return (
    <DataTable
      className="mt-3"
      columns={columns}
      data={data}
      pagination="true"
    />
  );
};

export default DeviceManagementTable;
