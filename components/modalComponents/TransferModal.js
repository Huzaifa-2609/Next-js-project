import React from "react";
import { useState } from "react";
import Transfer from "./Transfer";
import CoinSelector from "./CoinSelector";
import { TailSpin } from "react-loader-spinner";
import Receive from './Receive';

const TransferModal = ({ thirdWebTokens, sanityTokens, address }) => {
  const [action, setAction] = useState("send");
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0]);

  const selectedStyle = {
    color: "#8d1212",
    borderRadius: "4px",
  };

  const unselectedStyle = {
    border: "1px solid #32353d54",
    borderRadius: "4px",
  };

  const selectedModal = (option) => {
    switch (option) {
      case "send":
        return (
          <Transfer
            selectedToken={selectedToken}
            setAction={setAction}
            thirdWebTokens={thirdWebTokens}
            address={address}
          />
        );
      case "receive":
        return (
          <Receive
            selectedToken={selectedToken}
            setAction={setAction}
            address={address}
          />
        );
      case "select":
        return (
          <CoinSelector
            setAction={setAction}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sanityTokens={sanityTokens}
            thirdWebTokens={thirdWebTokens}
            address={address}
          />
        );
      case "transferring":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
            }}
          >
            <TailSpin color="#9f1313" height={70} width={70} />
            <div style={{ marginTop: "18px" }}>Transfer in progress...</div>
          </div>
        );
      case "transferred":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "600",
              color: "#27ad75",
            }}
          >
            Transfer complete
          </div>
        );
      default:
        return <h2>Send</h2>;
    }
  };
  //   const renderLogic = () => {
  //     if (action === 'send') {
  //       return (
  //         <Transfer
  //           setAction={setAction}
  //           thirdWebTokens={thirdWebTokens}
  //           sanityTokens={sanityTokens}
  //           selectedToken={selectedToken}
  //           walletAddress={walletAddress}
  //         />
  //       )
  //     } else if (action === 'receive') {
  //       return (
  //         <Receive
  //           setAction={setAction}
  //           selectedToken={selectedToken}
  //           walletAddress={walletAddress}
  //         />
  //       )
  //     } else if (action === 'select') {
  //       return (
  //         <CoinSelector
  //           setAction={setAction}
  //           selectedToken={selectedToken}
  //           setSelectedToken={setSelectedToken}
  //           sanityTokens={sanityTokens}
  //           thirdWebTokens={thirdWebTokens}
  //           walletAddress={walletAddress}
  //         />
  //       )
  //     } else if (action === 'transferring') {
  //       return (
  //         <div
  //           style={{
  //             width: '100%',
  //             height: '100%',
  //             display: 'flex',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             fontSize: '1.5rem',
  //           }}
  //         >
  //           Transfer in progress...
  //         </div>
  //       )
  //     } else if (action === 'transferred') {
  //       return (
  //         <div
  //           style={{
  //             width: '100%',
  //             height: '100%',
  //             display: 'flex',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             fontSize: '2rem',
  //             fontWeight: '600',
  //             color: '#27ad75',
  //           }}
  //         >
  //           Transfer complete
  //         </div>
  //       )
  //     }
  //   }

  return (
    <div className="WrapperTransferModal">
      <div className="SelectorTransferModal">
        <div
          className="OptionTransferModal"
          style={action === "send" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("send")}
        >
          <p>Send</p>
        </div>
        <div
          className="OptionTransferModal"
          style={action === "receive" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("receive")}
        >
          <p>Receive</p>
        </div>
      </div>
      {/* <div className="ModalMain">{renderLogic()}</div> */}
      <div className="ModalMain">{selectedModal(action)}</div>
    </div>
  );
};

export default TransferModal;
