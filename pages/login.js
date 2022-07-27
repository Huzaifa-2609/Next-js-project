import React from "react";
import Link from "next/link";
import Navbar from "../components/HomePage/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import Wallet from "../components/Wallet";
import AlertContext from "../src/Context/alert/AlertContext";


const login = () => {
  const context= useContext(AlertContext);
  const {successToast, failToast}= context;
  useEffect(() => {
    // redirect to home if already logged in
    if (localStorage.getItem("token")) {
        router.push('/');
    }
  },[])
  const {address} = useWeb3();
  const [credentials, setCredentials] = useState({email:"", password:""});
  let router=useRouter();
  useEffect(() => {
    if(address)
    { 
      successToast("Wallet Connected")
      localStorage.setItem("walletAddress", address)
    }
  }, [address]);
  const handleSubmit= async (e)=>{
    e.preventDefault();
    
    const response = await fetch(`http://localhost:9000/api/auth/login`, {
        "method": 'POST',
            
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({walletAddress:address,email:credentials.email,password:credentials.password}) 
        });
        const json=await response.json()
        if (json.success) {
            //redirect and save the auth token
            localStorage.setItem('token', json.authToken);
            successToast("login Successfull");
            const returnUrl ='/Dashboard';
            router.push(returnUrl);

        }
        else{
            // props.showAlert("Invalid credentials", "danger");
            failToast("Check Your Credentials")
        }
        console.log(json)
      
}
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>


      {/* <Navbar title="CRYFTS" /> */}
      {
        (!address)? <Wallet/>
        :
      
      <div
        className="signin-cls d-flex justify-content-center align-items-center mt-3"
        style={{ height: "100vh" }}
      >
        <div
          className="card shadow-lg "
          style={{ width: "30rem", height: "30rem", overflow: "hidden" }}
        >
          {/* <h1 className="m-auto text-color mt-3">Welcome Back</h1> */}
          <div
            className="d-flex gap-3 flex-column justify-content-center"
            style={{ padding: "50px" }}
          >
            <h1 className="card-title text-muted">Sign in</h1>
            <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Email1" className="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control p-2"
                id="Email1"
                aria-describedby="emailHelp"
                value={credentials.email}
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold "
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>

        
              <button className="btn btn1 text-light bd-color bg-color p-3 fw-bold w-100">
                Continue
              </button>
        
            </form>
            <Link href="/signup">
              <a className="btn btn-dark p-3 fw-bold">Create account</a>
            </Link>
          </div>
        </div>
      </div>}
    </>
  );
};

export default login;
