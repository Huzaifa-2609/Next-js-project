import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { chartDays } from '../config/data.js';
import SelectButton from './SelectButton';
import { useEffect, useState } from "react";
import { createTheme } from '@mui/material/styles';
import { Line } from "react-chartjs-2";
import {ThemeProvider} from '@mui/styles';
import { useMemo } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

const useClasses = (stylesElement) => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses = typeof stylesElement === 'function'
      ? stylesElement(theme)
      : stylesElement;
    const prepared = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value);
    });

    return prepared;
  }, [stylesElement, theme]);
};

export default function CoinInfo(){
    const router = useRouter()
    const {coinid} = router.query
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const [flag,setflag] = useState(false);

    const styles = theme => ({
        container: {
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        },
      });
    
  
    const classes = useClasses(styles);

    const fetchHistoricData = async () => {
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=USD&days=${days}`);
        const json = await data.json()
        console.log(json);
        setflag(true);
        setHistoricData(json?.prices);
        
      };
    
      useEffect(() => {
        fetchHistoricData ();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [days]);
  


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container }>
        {!historicData? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in "USD"`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};