import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

const Loading = ({ setIsLoading }) => {
  //   useEffect(() => {
  //     // Set a timeout to delay the execution of the effect
  //     const timeoutId = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2200);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
