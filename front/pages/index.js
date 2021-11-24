import React, { useState } from "react";

import { Fab, TextField, Alert, Stack, styled, CircularProgress} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { InsertLinkOutlined } from "@mui/icons-material";

import { isWebUri } from "valid-url";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "purple",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    backgroundColor: "lightgray",
  },
});

export default function Home() {
  const [userURL, setUserURL] = useState("");
  const [emptyURL, setInvalidStatus] = React.useState(false);
  const [successInfo, setSuccessInfo] = React.useState(false);
  const [successText, setSuccessText] = useState("Success!!");
  const [loadingStatus, setLoading] = React.useState(false);

  function handleChange(event) {
    setInvalidStatus(false);
    setUserURL(event.target.value);
  }

  const shortenURL = () => {
    setSuccessInfo(false);
    setLoading(true);
    if (userURL === null || userURL === "") {
      //Empty URL, show error alert.
      setInvalidStatus(true);
      setLoading(false);
    } else {
      //URL exists
      let url_formatted = "";
      if (userURL.startsWith("http://") || userURL.startsWith("https://")) {
        //URL format initially correct
        url_formatted = userURL;
      } else {
        //Format correction to be passed to validator.
        url_formatted = "http://" + userURL;
        setUserURL(url_formatted);
      }
      //Validation of valid URL using valid-url npm package
      if (!isWebUri(url_formatted)) {
        //Bad URL, show error alert.
        setInvalidStatus(true);
        setLoading(false);
      } else {
        //Good URL
        queryRoute(url_formatted);
      }
    }
  };

  const queryRoute = (url) => {
    fetch("/api/checkUrl?queryUrl=" + url)
      .then((response) => response.json())
      .then((data) => {
        if(data.route){
          setSuccessText("Your new URL has been created at: " + process.env.NEXT_PUBLIC_SHORTEN_BASE + data.route);
          setSuccessInfo(true);
          setLoading(false);
        }
        else{
          setInvalidStatus(true);
          setLoading(false);
        }
      });
  };

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      shortenURL();
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Yugnar&apos;s URL shortener</title>
        <meta name="description" content="Yugnar&apos;s ULR shortener page title" />
        <link rel="icon" href="/yugIcon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Yugnar&apos;s <span className={styles.pageTitle}>URL shortener</span>
        </h1>

        <p className={styles.description}>Enter a URL to shorten:</p>

        <CssTextField
          fullWidth
          label="URL"
          id="custom-css-outlined-input"
          value={userURL}
          onChange={handleChange}
          onKeyDown={_handleKeyDown}
          style={{padding : "20px"}}
        />

        {successInfo ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              {successText}</Alert>
          </Stack>
        ) : null}

        {emptyURL ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">URL cannot be empty or is not valid!</Alert>
          </Stack>
        ) : null}

        <Fab
          variant="extended"
          className={styles.generateButton}
          onClick={shortenURL}
          disabled={loadingStatus}
        >
          <NavigationIcon sx={{ mr: 1 }}/>
          Generate
          {loadingStatus ? <CircularProgress className={styles.loading}/> : null}
        </Fab>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/yugnar" target="_blank" rel="noreferrer">
          Created by Rafael Rojas{" "}
          <span className={styles.logo}>
            <Image src="/yugnar.svg" alt="Yugnar Logo" width={32} height={25} />
          </span>
        </a>
      </footer>
    </div>
  );
}
