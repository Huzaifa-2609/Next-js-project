import React from "react";
import Link from "next/link";
import Navbar from "../components/HomePage/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import Wallet from "../components/Wallet";
import AlertContext from "../src/Context/alert/AlertContext";

const signup = () => {
  const context = useContext(AlertContext)
  const {successToast, failToast}= context;
  const {address} = useWeb3();
  let router=useRouter();
  useEffect(() => {
    // redirect to home if already logged in
    if (localStorage.getItem("token")) {
        router.push('/');
    }
  },[])
  useEffect(() => {
    if(address)
    {
        localStorage.setItem("walletAddress", address)
    }
  }, [address]);
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const [credentials, setCredentials] = useState({firstname:"",lastname:"", email:"", password:"", phoneno:"", cpassword:""});
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const { firstname, lastname, email, password, phoneno}=credentials;
    const response = await fetch(`http://localhost:9000/api/auth/createuser`, {
        "method": 'POST',
            
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({walletAddress:address,firstname:firstname,lastname:lastname, email:email, phoneno:phoneno,password:password}) 
        });
        const json=await response.json()
        //redirect and save the auth token
        if (json.success) {
        successToast("Signup Successfull")
        localStorage.setItem('token', json.authToken);
        const returnUrl = '/Dashboard';
        router.push(returnUrl);
      }
      else{
        failToast(json.message)
      }
      console.log(json)

}
  return (
    <>
     {/* <Navbar title = "CRYFTS"/> */}
     {(!address)?<Wallet/>
     :
     
    <div
      className=" signup-cls d-flex flex-column align-items-center p-3"
      style={{ marginTop: "5%" }}
    >
      <h1 className="display-5">Create your account</h1>
      <form className="mt-3 d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex empass gap-2 flex-wrap">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="firstname"  value={credentials.firstname} onChange={onChange} />
          </div>
          <div className="mb-3 ">
            <label htmlFor="Lname" className="form-label">
              Last name
            </label>
            <input type="text" className="form-control" id="Lname" name="lastname" value={credentials.lastname} onChange={onChange}/>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
           name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          name="password"
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telphone" className="form-label">
           Phone Number
          </label>
          <input
          name="phoneno"
            type="tel"
            className="form-control"
            id="telphone"
            value={credentials.phoneno}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label
            className="form-check-label text-color"
            htmlFor="exampleCheck1"
          >
            Accept terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="btn btn1 bg-color fw-bold bd-color text-light py-2 my-3 m-auto"
          style={{ width: "80%" }}
        >
          Submit
        </button>
      </form>
        <span className="m-auto">
          Already have an account?&nbsp;
          <Link href="/login">
            <a className="text-decoration-none">login</a>
          </Link>{" "}
        </span>
    </div>}
    </>
  );
};

export default signup;