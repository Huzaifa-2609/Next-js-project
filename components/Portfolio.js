import React from "react";
import styles from "./Portfolio.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../static/coins";
import Coin from "./Coin";
import BalanceChart from "./BalanceChart";
import axios from "axios";
import { CoinList } from "../config/api";
import { useEffect, useState } from "react";

const Portfolio = ( props ) => {
  const [coins1, setCoins] = useState([]);
  console.log(props.thirdWebTokens);
  console.log(props.sanityTokens);
  console.log(props.walletAddress);
  
  const [walletBalance, setWalletBalance] = useState(0)
  const tokenToUSD = {};

  for (const token of props.sanityTokens){
    tokenToUSD[token.contractaddress] = parseInt((token.usdPrice).split(',').join(''));
  }

  console.log(tokenToUSD);

  useEffect(() => {
    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        props.thirdWebTokens.map(async token => {
          const balance = await token.balanceOf(props.walletAddress)
          return Number(balance.displayValue) * tokenToUSD[token.address]
        })
      )
      setWalletBalance(totalBalance.reduce((acc, curr)=> acc+curr,0));
    }
    calculateTotalBalance()
}, [props.thirdWebTokens, props.sanityTokens])

const fetchCoins = async () => {
  const  data  = await fetch(CoinList());
  const json= await data.json();
  console.log(json)
  setCoins(json);
};

useEffect(() => {
  fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Content}>
        <div className={styles.Chart}>
          <div>
            <div>
              <div className={styles.BalanceTitle}>Portfolio balance</div>
              <div className={styles.BalanceValue}>
                {"$"}
                {walletBalance.toLocaleString('US')}
                {/* 45,000 */}
              </div>
            </div>
            <BalanceChart />
          </div>

        </div>
        <div className={styles.PortfolioTable}>
          <div className={styles.TableItem}>
            <div className={styles.Title}>Your Assets</div>
          </div>
          <div className={styles.Divider} />
          <div className={styles.Table}>
            <div className={styles.TableItem}>
              <div className={styles.TableRow}>
                <div style={{ flex: 3 }}>Name</div>
                <div style={{ flex: 2 }}>Price</div>
                <div style={{ flex: 2 }}>24h Change</div>
                <div style={{ flex: 2 }}>Market Cap</div>
                <div style={{ flex: 0 }}>
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            <div className={styles.Divider} />
            <div>
              {(coins1 || []).map((coin) => (
                <div key={coin.name}>
                  <Coin coin={coin} />
                  {/* <h2>{coin.name}</h2> */}
                  <div className="Divider" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
