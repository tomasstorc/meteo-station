import { Card, CardContent, Typography } from "@mui/material";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const GraphComponent = ({ name, color, data, type }) => {
  return (
    <Card className="p-2 m-3 ">
      <Typography variant="h6">{name}</Typography>
      <CardContent>
        <Typography component="div" color="text.secondary">
          <AreaChart
            width={1000}
            height={180}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis dataKey={type} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={type}
              stroke={color}
              fillOpacity={1}
              fill={`url(#color${color} )`}
            />
          </AreaChart>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GraphComponent;
