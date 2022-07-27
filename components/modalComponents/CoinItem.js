import React from "react";
import { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { FaCheck } from "react-icons/fa";

const CoinItem = (props) => {
  const [balance, setBalance] = useState("Fetching...");
  const [imageUrl, setImageUrl] = useState(null);
  // const [builder] = useState(imageUrlBuilder(client));

  useEffect(() => {
    const getBalance = async () => {
      let activeTwtoken;

      props.thirdWebTokens.map((twtoken) => {
        if (twtoken.address === props.token.contractaddress) {
          activeTwtoken = twtoken;
        }
      });

      const balance = await activeTwtoken.balanceOf(props.sender);

      return await setBalance(balance.displayValue.split(".")[0]);
    };

    const getImgUrl = async () => {
      const imgUrl = imageUrlBuilder(client).image(props.token.logo).url();
      setImageUrl(imgUrl);
    };

    getImgUrl();
    getBalance();
  }, []);

  return (
    <div
      className="WrapperCoinItem"
      style={{
        backgroundColor: props.selectedToken.name === props.token.name && "#32353d54",
      }}
      onClick={() => {
        props.setSelectedToken(props.token);
        props.setAction("send");
      }}
    >
      <div className="MainCoinItem">
        <div className="IconCoinItem">
          <img src={imageUrl} alt="" />
        </div>
        <div>
          <div className="NameCoinItem">{props.token.name}</div>
          <div className="SymbolCoinItem">{props.token.symbol}</div>
        </div>
      </div>
      <div>
        {balance} {props.token.symbol}
      </div>
      <div className="IsSelected">
        {Boolean(props.selectedToken.contractaddress === props.token.contractaddress) && (
          <FaCheck />
        )}
      </div>
    </div>
  );
};

export default CoinItem;