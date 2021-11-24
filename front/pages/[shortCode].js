import React, { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress} from "@mui/material";

export default function Redirector({ data }) {
  const router = useRouter();
  const [destinationURL, setDestinationURL] = useState("");

  const handleRedirection = () => {
    fetch("/api/" + router.query.shortCode)
      .then((response) => response.json())
      .then((data) => {
        setDestinationURL(data.route);
        window.location.href = data.route;
      });
  };
  handleRedirection();

  return (
    <>
      <h1 style={{ marginLeft: "15px" }}>Redirecting... <CircularProgress/></h1>
    </>
  );
}