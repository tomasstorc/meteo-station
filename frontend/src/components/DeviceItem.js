import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const DeviceItem = ({ name, data, id }) => {
  return (
    <div className="col-4">
      <Link to={`/dashboard/${id}`}>
        <Card sx={{ maxWidth: 345 }} className="p-2 m-3 col-md-6 col-sm-12">
          <CardActionArea>
            <Box sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 45, height: 1 }}
                image="https://cdn-icons-png.flaticon.com/512/6074/6074032.png"
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}></Box>
            </Box>
            <Typography variant="h6">{name}</Typography>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default DeviceItem;
