import React from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import ReactHtmlParser from "react-html-parser";
import { useMemo } from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import CoinInfo from "../../components/CoinInfo.js";

const useClasses = (stylesElement) => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses =
      typeof stylesElement === "function"
        ? stylesElement(theme)
        : stylesElement;
    const prepared = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value);
    });

    return prepared;
  }, [stylesElement, theme]);
};

export default function Coinitem() {
  const router = useRouter();
  const { coinid } = router.query;
  const [coin, setCoins] = useState([]);

  const fetchCoins = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinid}`
    );
    const json = await data.json();
    console.log(json);
    setCoins(json);
  };

  console.log(coinid);
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = (theme) => ({
    container: {
      display: "flex",
      [
        theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      // sidebar: {
      //   width: "100%",
      //   [theme.breakpoints.down("md")]: {
      //     width: "100%",
      //   },
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   // textAlign: "center",
      //   justifyContent: "center",
      //   marginTop: 25,
      //   borderRight: "2px solid grey",
      // },
      // heading: {
      //   fontWeight: "bold",
      //   marginBottom: 20,
      //   fontFamily: "Montserrat",
      // },
      // description: {
      //   width: "20%",
      //   fontFamily: "Montserrat",
      //   padding: 25,
      //   paddingBottom: 15,
      //   paddingTop: 0,
      //   textAlign: "justify",
      // },
      // marketData: {
      //   alignSelf: "start",
      //   padding: 25,
      //   paddingTop: 10,
      //   width: "100%",
      // },
    },
  });

  const classes = useClasses(styles);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{marginTop:79, marginBottom: 25, marginLeft: 90 }}
        />

        <Typography
          style={{marginBottom:20, fontWeight:"bold",  textAlign: "center"}}
          // textAlign={"center"}
          variant="h3"
          // className={classes.heading}
        >
          {coin?.name}
        </Typography>
        <Typography
          // textAlign={"justify"}
          variant="subtitle1"
          style={{padding:5, paddingLeft:20, marginBottom:10}}
          className={classes.description}
        >
          {ReactHtmlParser(coin?.description?.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex", padding:3, paddingLeft:20}}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex", padding:3, paddingLeft:20}}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {"$ "}
              {coin?.market_data?.current_price["usd"]}
            </Typography>
          </span>
          <span style={{ display: "flex", padding:3, paddingLeft:20}}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {"$ "}
              {coin?.market_data?.market_cap["usd"].toString().slice(0, -6)}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}
