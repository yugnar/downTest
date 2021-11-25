import React, { useState, useEffect } from "react";

import { Button, Grid, Fab, TextField, Table, Alert, Stack, styled, CircularProgress } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

import Head from "next/head";
import styles from "../styles/Home.module.css";

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

    const [data, setData] = useState([]);

    const loadUserState = async () => {
        await api
            .get("http://localhost:3000/users")
            .then((res) => {
                setData(res.data.downTable);
                console.log("id - " + res.data.username);
                console.log("status code - " + res.status);
            })
            .catch((err) => {
                console.log("Error status code - " + err.status);
            })
    }

    useEffect(() => {
        loadUserState();
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Website Status Monitor</title>
                <meta name="description" content="Website Status Monitor" />
            </Head>

            <div className={styles.accountButtons}>
                <Grid container>
                    <Link
                        href={'/'}
                        passHref>
                        <Button variant="contained">Regresar</Button>
                    </Link>
                </Grid>
                <h1>
                    Reportes de <span className={styles.pageTitle}>Sitio no Disponible</span>
                </h1>
            </div>

            <main className={styles.main}>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">URL</th>
                            <th scope="col">Fecha del reporte</th>
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.url}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </main>
        </div>
    );
}