import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DashboardItem = ({ name, data }) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="p-2 m-3 col-md-6 col-sm-12">
      <CardActionArea>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 45, height: 1 }}
            image="https://cdn-icons-png.flaticon.com/512/6074/6074032.png"
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5" color="text.secondary">
                {data}
              </Typography>
            </CardContent>
          </Box>
        </Box>
        <Typography variant="h6">{name}</Typography>
      </CardActionArea>
    </Card>
  );
};

export default DashboardItem;
