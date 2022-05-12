import React from 'react'
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../Pages/CryptoContext/CryptoContext';
import { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({

    carousel: {
        display: "flex",
        height: "50%",
        alignItems: "center"
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "rgb(86, 243, 51)"
    }
}));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}

function Carousel() {
        
    const [tranding, setTranding] = useState([]);

    const classes = useStyles();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTranding(data);
    }



    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = tranding.map((coin) => {
        
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
            className={classes.carouselItem}
            to={`/coins/${coin.id}`}>
                <img src={coin?.image} 
                alt={coin.name}
                height= "80"
                style={{ marginBottom: 10}} />
                <span>{coin?.symbol}
                &nbsp;
                <span style={{
                    color: profit > 0 ? "rgb(14, 203, 129" : "red",
                    fontWeight: 500
                    }}>{ profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)} %</span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500}}>
                    { symbol } {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
    }


  return (
    <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableButtonsControls
            responsive={responsive}
            autoPlay
            disableButtonsControls
            disableDotsControls
            items={items}
        />
    </div>
  )
}

export default Carousel