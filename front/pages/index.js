import React, { useState, useEffect } from "react";

import { Button, Grid, Fab, TextField, Alert, Stack, styled, CircularProgress } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { InsertLinkOutlined } from "@mui/icons-material";

import Link from 'next/link';
import api from "../axios";

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

  const [showURLInput, setShowURLInput] = React.useState(false);
  const [username, setUsername] = useState("");

  const loadUserState = () => {
    api
      .get("http://localhost:3000/users")
      .then((res) => {
        console.log("id - " + res.data.username);
        console.log("status code - " + res.status);
        setUsername(res.data.username);
        setShowURLInput(true);
      })
      .catch((err) => {
        console.log("Error status code - " + err.status);
        setShowURLInput(false);
      })
  }

  useEffect(() => {
    loadUserState();
  }, []);

  function handleChange(event) {
    setInvalidStatus(false);
    setUserURL(event.target.value);
  }

  const monitorURL = () => {
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

  const queryRoute = (url_formatted) => {
    console.log("We building stuffz");

    api
      .post("http://localhost:3000/saveUrl", {
        url: url_formatted,
      })
      .then((res) => {
        setSuccessText("Your URL is now being monitored! ");
        setSuccessInfo(true);
        setLoading(false);
      })
      .catch((err) => {
        setInvalidStatus(true);
        setLoading(false);
      })
  };

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      monitorURL();
    }
  }

  return (
    <div className={styles.container}>
      {
        !showURLInput ?
          <div className={styles.accountButtons}>
            <Grid container justifyContent="flex-end">
              <Link
                href={'/auth/login'}
                passHref>
                <Button variant="outlined">Login</Button>
              </Link>
              <Link
                href={'/auth/register'}
                passHref>
                <Button variant="contained" style={{ marginLeft: "10px" }}>Register</Button>
              </Link>
            </Grid>
          </div>
          :
          <div className={styles.accountButtons}>
            <Grid container justifyContent="flex-end">
              <p><strong>Bienvenido, {username}</strong></p>
              <Link
              href={'/history'}
              passHref>
              <Button variant="contained" style={{ marginLeft : "25px" }}>Ver Historial de Sitios</Button>
            </Link>
            </Grid>
          </div>
      }

      <Head>
        <title>Website Status Monitor</title>
        <meta name="description" content="Website Status Monitor" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Website <span className={styles.pageTitle}>Status Monitor</span>
        </h1>

        <p className={styles.description}><strong>Enter a URL to monitor. If your website goes down, a message will be sent to your account's email automatically (checks every 5 minutes).</strong></p>

        {showURLInput ?
          <CssTextField
            fullWidth
            label="URL"
            id="custom-css-outlined-input"
            value={userURL}
            onChange={handleChange}
            onKeyDown={_handleKeyDown}
            style={{ padding: "20px" }}
          /> :
          <div>
            You need to be logged in to start monitoring URLs!
          </div>
        }

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

        {showURLInput ?
          <div>
            <Fab
              variant="extended"
              className={styles.generateButton}
              onClick={monitorURL}
              disabled={loadingStatus}
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Monitor this URL
              {loadingStatus ? <CircularProgress className={styles.loading} /> : null}
            </Fab>            
          </div>
          : null
        }
      </main>
    </div>
  );
}