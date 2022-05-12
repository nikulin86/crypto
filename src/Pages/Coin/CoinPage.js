import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CryptoState } from '../CryptoContext/CryptoContext';
import { SingleCoin } from '../../config/api';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from './../../Components/CoinInfo/CoinInfo';
import CoinPageSlice, { fetchCoinSlice } from '../../store/CoinPageSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Paper, Switch } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    }
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "M"
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify"
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",

    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }
}));


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function CoinPage() {
  const { id } = useParams();
  // const [coin, setCoin] = useState();


  const coin = useSelector(state => state.coin.coin)

  console.log(coin)

  // console.log(coin)

  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  // const fetchCoin = async () => {
  //   const { data } = await axios.get(SingleCoin(id));

  //   setCoin(data);
  // }

  // useEffect(() => {
  //   fetchCoin();
  // }, [currency]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinSlice(id))
  }, [currency]);


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />


  return (


    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={coin.image?.large}


          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }} />

        <div variant='h3' className={classes.heading}>
          {coin && coin.description?.en.split(". ")[0]}
        </div>
        {/* <div variant='h3' className={classes.heading}>
          {coin && coin.description.map(c => <h1>{c.en}</h1>)}
        </div> */}

        {/* <Typography variant='subtitle' className={classes.description}>
          {coin.description.map(c => en.split(". ")[0])}.
        </Typography>  */}
        {/* <Typography variant='subtitle' className={classes.heading}>
          Liquidity Score:{ coin && coin.map(c => <div>{c.name}</div>)}
        </Typography> */}

        <div className={classes.marketData}>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;  &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: "Montserrat"
              }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp;  &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: "Montserrat"
              }}>
              {symbol}{" "}
              {(coin.market_data?.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5" className={classes.heading}>
              Market Cap: {" "}
            </Typography>
            &nbsp;  &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: "Montserrat"
              }}>
              {symbol}{" "}
              {(coin.market_data?.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6))} M
            </Typography>
          </span>

        </div>

      </div>

      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage