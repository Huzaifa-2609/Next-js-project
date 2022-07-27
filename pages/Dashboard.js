import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    ethers.getDefaultProvider("rinkeby","https://rinkeby.infura.io/v3/")
  )
);

const Dashboard = ({  }) => {
  const ISSERVER = typeof window === "undefined";
  let walletAddress;
  if(!ISSERVER) {
   // Access localStorage
    walletAddress=localStorage.getItem('walletAddress')
  } 
  const [thirdWebTokens, setThirdWebTokens] = useState([]);
  const [sanityTokens, setSanityTokens] = useState([]);

  useEffect(() => {
    const getSanityAndThirdWebTokens = async () => {
      const coins = await fetch(
        "https://2loone7d.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%27coins%27%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractaddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D"
      );
      const sanityTokens = (await coins.json()).result;

      setSanityTokens(sanityTokens);

      setThirdWebTokens(
        sanityTokens.map((token) => sdk.getTokenModule(token.contractaddress))
      );
    };

    getSanityAndThirdWebTokens();
  }, []);

  return (
    <div className="WrapperDashboard">
      <Sidebar />
      {walletAddress && <div className="MainContainer">
         <Header
          thirdWebTokens={thirdWebTokens}
          sanityTokens={sanityTokens}
          address={walletAddress}
        />
        <Main
          thirdWebTokens={thirdWebTokens}
          sanityTokens={sanityTokens}
          address={walletAddress}
        />
      </div>}
    </div>
  );
};

export default Dashboard;

// export async function getServerSideProps(context) {}
