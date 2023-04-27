import { CircularProgress } from "@mui/material";

const Loading = ({ text = "Loading" }) => {
  return (
    <div className="text-center">
      <CircularProgress />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
