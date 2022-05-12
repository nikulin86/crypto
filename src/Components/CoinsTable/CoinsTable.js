import React from 'react';
import { useState, useEffect } from 'react'
import { CoinList } from "../../config/api";
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { CryptoState } from '../../Pages/CryptoContext/CryptoContext';
import { Container, createTheme, ThemeProvider, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';




const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: "#1617a",
        opacity: 1,
        cursor: "pointer",
        "&:hover": {
            // backgroundColor: "#fff"
            opacity: 0.5,
        },
        fontFamily: "Montserrat"
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "rgb(86, 243, 51)"
        }
    }

}));


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function CoinsTable() {
    const classes = useStyles();

    let navigate = useNavigate();

    const { currency, symbol } = CryptoState();     

    const [coins, setCoins] = useState([]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchCoinTable = async () => {
        setLoading(true)

        const { data } = await axios.get(CoinList(currency));



        setCoins(data);
        setLoading(false);

    }


    useEffect(() => {
        fetchCoinTable();
    }, [currency]);


    // const darkTheme = createTheme({
    //     palette: {
    //         primary: {
    //             main: "#fff"
    //         },
    //         type: "dark"
    //     }
    // });


    const handelSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    };





    return (
        // <ThemeProvider theme={darkTheme}>
            <Container style={{ teaxAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Price by market cap
                </Typography>

                <TextField
                    label="Search for crypto currency.."
                    variant="outlined"
                    style={{
                        marginBottom: 20,
                        width: "100%"
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (<Table>
                            <TableHead style={{ background: " linear-gradient(133deg, rgba(131,58,180,1) 0%, rgba(208,213,4,1) 0%, rgba(214,228,171,1) 45%, rgba(100,250,5,1) 69%)" }} >
                                <TableRow>
                                    {["Coin", "Price", "24 Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                // color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat"
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handelSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() => {
                                                    navigate(`/coins/${row.id}`)
                                                }}
                                                className={classes.row}
                                                key={row.name}
                                            >

                                                <TableCell
                                                    component="th" scope="row"
                                                    styles={{
                                                        display: "flex",
                                                        gap: 15
                                                    }}
                                                >

                                                    <img src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }} />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column"
                                                        }}>
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22
                                                            }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{
                                                            color: "darkgrey",
                                                            fontSize: 20
                                                        }}>
                                                            {row.name}
                                                        </span>
                                                    </div>

                                                </TableCell>


                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>

                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>

                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                                    M
                                                </TableCell>


                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>)
                    }
                </TableContainer>

                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                    classes={{ ul: classes.pagination }}
                    count={(handelSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450)
                    }}
                />
            </Container>
        // </ThemeProvider >
    )
}

export default CoinsTable;