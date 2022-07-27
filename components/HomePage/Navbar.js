import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = (props) => {
  
  const location = useRouter();
  return (
    <div>
      <nav className="navbar shadow-sm fixed-top navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand text-color fw-bolder mx-4 fs-3" href="/">
            {props.title}
          </a>
          {location.pathname === "/signup" ? (
            ""
          ) : (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}
          <div
            className="collapse navbar-collapse fw-bold"
            style={{ width: "50%" }}
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav gap-4 m-auto mb-lg-0"
              style={
                location.pathname === "/signup" ? { visibility: "hidden" } : {}
              }
            >
              <li className="nav-item ">
                <Link href="/">
                  <a className="nav-link " aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link href="/">
                  <a className="nav-link " aria-current="page">
                    Prices
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link href="/">
                  <a className="nav-link ">Learn</a>
                </Link>
              </li>

              <li className="nav-item ">
                <Link href="/">
                  <a
                    className="nav-link pe-none"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Developers
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link href="/">
                  <a className="nav-link">Company</a>
                </Link>
              </li>
            </ul>
            <form className="d-flex mx-4" role="search">
              {location.pathname === "/signup"  ? (
                <ul className="navbar-nav media">
                  <li className="nav-item float-right">
                    <Link href="/login">
                      <a className="nav-link">Sign in</a>
                    </Link>
                  </li>
                </ul>
              ) : (
                // style={location.pathname === "/login"? {display:"none"}:""}
                <ul className="navbar-nav gap-3 media" >
                  <li
                    className="nav-item float-right"
                    style={
                      (location.pathname === "/") ? { display: "none" } : {}
                    }
                  >
                    <Link href="/login">
                      <a className="nav-link fs-6 ">Sign in</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/login">
                      <a
                        className="btn btn1 text-light bd-color bg-color"
                        type="submit"
                      >
                        Get Started
                      </a>
                    </Link>
                  </li>
                </ul>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
