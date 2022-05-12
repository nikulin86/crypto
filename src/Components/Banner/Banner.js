import React from 'react'
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@material-ui/core';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {

    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}))

function Banner() {

    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            // color: "rgb(251, 255, 24)",
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat"
                        }}>
                        Crypto App
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            // color: "rgb(86, 243, 51)",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            fontSize: 25
                        }}>
                     Aplication Using "Redux Toolkit & MATERIAL-UI"
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner

