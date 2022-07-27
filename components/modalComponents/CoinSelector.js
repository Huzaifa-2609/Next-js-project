import React from "react";
// import { useState } from 'react';
import CoinItem from "./CoinItem";

// const tempFromAddress = '0xB4EbD453D80A01A0dC7De077c61B1c9b336F05E3'

const CoinSelector = ({
  setAction,
  selectedToken,
  setSelectedToken,
  sanityTokens,
  thirdWebTokens,
  address,
}) => {
  // const [sender] = useState(props.address)

  return (
    <div>
      <div className="TitleCoinSelector">Select asset</div>
      <div className="CoinList">
        {sanityTokens.map((token, index) => (
          <CoinItem
            key={index}
            token={token}
            sender={address}
            selectedToken={selectedToken}
            setAction={setAction}
            setSelectedToken={setSelectedToken}
            sanityTokens={sanityTokens}
            thirdWebTokens={thirdWebTokens}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinSelector;
