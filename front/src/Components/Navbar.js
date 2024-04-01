import React from "react";
import { setConstraint } from "../constraints";
import axios from "axios";
import LostItem from "./Lost_item";
import { ToastProvider } from 'react-toast-notifications';

function Navbar() {
  const token = window.localStorage.getItem("token");

  const signout = () => {
    setConstraint(false);

    console.log("Signed out !");
    axios({
      url: "http://localhost:5000/signout",
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(localStorage.clear())
      .catch((error) => {
        console.log(error);
        // console.log("Error occured");
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          {token ? "Lost - Found" : "Lost - Found"}
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{ textDecoration: "none", color: "white" }}
                target="_black"
              >
                Contact Us
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {token && (
              <>
                <li className="nav-item">
                  <ToastProvider autoDismiss={true} placement={"bottom-right"}>
                    <div>
                      <LostItem />
                    </div>
                  </ToastProvider>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ textDecoration: "none", color: "white" }}
                    href="/feed"
                  >
                    Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ textDecoration: "none", color: "white" }}
                    href="/responses"
                  >
                    Responses
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ textDecoration: "none", color: "white" }}
                    href="/mylistings"
                  >
                    My Listings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ textDecoration: "none", color: "white" }}
                    href="/features"
                  >
                    Features
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={signout}
                    href="/log-in"
                  >
                    Sign-out
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
