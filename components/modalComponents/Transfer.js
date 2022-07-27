import React from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";

const Transfer = (props) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [activeTwToken, setActiveTwToken] = useState();
  const [balance, setBalance] = useState("Fetching...");

  useEffect(() => {
    const getBalance = async () => {
      const balance = await activeTwToken.balanceOf(props.address)
      setBalance(balance.displayValue)
    }

    if (activeTwToken) {
      getBalance()
    }
  }, [activeTwToken])

  useEffect(() => {
    const url = imageUrlBuilder(client).image(props.selectedToken.logo).url();
    setImageUrl(url);
    console.log(props.selectedToken);

    const activeToken = props.thirdWebTokens.find(
      (token) => token.address === props.selectedToken.contractaddress
    );
    setActiveTwToken(activeToken);
    console.log(activeToken);
    
  }, [props.thirdWebTokens, props.selectedToken]);

  const sendCrypto = async () => {
    console.log('sending crypto')

    if (activeTwToken && amount && recipient) {
      props.setAction('transferring')
      const result = await activeTwToken.transfer(
        recipient,
        amount.toString().concat('000000000000000000'),
      )
      console.log(result)
      props.setAction('transferred')
    } else {
      console.log('missing data')
    }
  }
z
  return (
    <div className="WrapperTransfer">
      <div className="Amount">
        <div className="FlexInputContainer">
          <FlexInput
            className="FlexInput"
            placeholder="0"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{props.selectedToken.symbol}</span>
        </div>
        <div className="WarningTransfer" style={{ color: amount && "white" }}>
          Amount is a required field
        </div>
      </div>
      <div className="TransferForm">
        <div className="RowTransfer">
          <div className="FieldName">To</div>
          <div className="IconTransfer">
            <FaWallet />
          </div>
          <Recipient
            placeholder="Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="DividerReceive" />
        <div className="RowTransfer">
          <div className="FieldName">Pay with</div>
          <div
            className="CoinSelectListTranfer"
            onClick={() => props.setAction('select')}
          >
            <div className="IconTransfer">
              <img src={imageUrl} />
            </div>
            <div className="CoinNameTransfer">{props.selectedToken.name}</div>
          </div>
        </div>
      </div>
      <div className="RowTransfer">
        <div className="Continue" onClick={() => sendCrypto()}>
          Continue
        </div>
      </div>
      <div className="BottonRowTransfer">
        <div>{props.selectedToken.symbol} Balance</div>
        <div>{balance} {props.selectedToken.symbol}</div>
      </div>
    </div>
  );
};

export default Transfer;

const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #9f1313;
  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const Recipient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`;
