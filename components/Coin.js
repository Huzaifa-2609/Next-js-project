import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Router from "next/router";

const Coin = ({ coin }) => {
  return (
    <div
      onClick={() => {
        Router.push({
          pathname: `/coins/${coin.id}`,
        });
      }}
      className="WrapperCoin"
    >
      <div>
        <div style={{ flex: 3 }}>
          <div className="NameCol">
            <div className="CoinIcon">
              <img src={coin.image} height="28px" alt={coin.name} />
            </div>
            <div>
              <div className="Primary">{coin.name}</div>
              <div
                className="Secondary"
                style={{
                  textTransform: "uppercase",
                  // fontSize: 22,
                }}
              >
                {coin.symbol}
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <div className="Primary">
            {"$"}
            {coin.current_price}
          </div>
        </div>
        <div style={{ flex: 2 }}>
          {/* <div className="Primary">
            {"$"}
            {coin.current_price}
          </div> */}
          <div
            style={{
              color:
                coin.price_change_percentage_24h < 0 ? "#f0616d" : "#26ad75",
            }}
          >
            {coin.price_change_percentage_24h > 0 && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
        <div style={{ flex: 2 }}>{coin.market_cap_rank}</div>
        <div style={{ flex: 0 }}>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default Coin;
