import Link from "next/link";
import React, {useEffect} from "react";
import Navbar from "./HomePage/Navbar";
import { useWeb3 } from "@3rdweb/hooks";

const Wallet = () => {
    const { address, connectWallet } = useWeb3();
   

  return (
    <>
      {/* <Navbar title="CRYFTS" /> */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="card border-0 ">
          <div className="card-body">
            <h2 className="card-title display-6">Connect to MetaMask Wallet</h2>
            <a
            onClick={() => connectWallet("injected")}
              role={"button"}
              class="card-subtitle my-3 text-muted fs-4 text-decoration-none"
            >
              Click here to connect to wallet to continue
            </a>
            {/* <div className="d-flex gap-3 mt-4">
              <Link href="/login">
                <button disabled={!address} className="btn btn-outline-primary px-5">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button disabled={!address} className="btn btn-outline-primary px-5">
                  Signup
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
