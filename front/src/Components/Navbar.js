import React, { useState } from "react";
import { setConstraint } from "../constraints";
import axios from "axios";
import LostItem from "./Lost_item";
import { ToastProvider } from "react-toast-notifications";
import { FaBell } from "react-icons/fa"; // Import the bell icon
import NotificationWindow from "./NotificationWindow"; // Import NotificationWindow component

function Navbar() {
  const token = window.localStorage.getItem("token");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); // State for toggling notification window

  const signout = () => {
    setConstraint(false);

    console.log("Signed out!");
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
      });
  };

  const fetchNotifications = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      console.log("User is not logged in or user data is missing.");
      return;
    }

    const userId = user._id; // Get the user ID from local storage

    console.log("Fetching notifications for user ID:", userId);

    // Make API call to fetch notifications
    axios
      .get(`http://localhost:5000/notifications/${userId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((response) => {
        // Set notifications from the response data
        setNotifications(response.data.notifications);
        setShowNotifications(true); // Show the notification window when clicked
      })
      .catch((error) => {
        console.error("Error fetching notifications", error);
      });
  };

  const closeNotifications = () => {
    setShowNotifications(false); // Close the notification window
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#333", // Dark background
        padding: "10px 20px",
        color: "white",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      <div className="container-fluid" style={{ whiteSpace: "nowrap", paddingBottom: "10px", paddingTop: "10px" }}>
        <a
          className="navbar-brand"
          href="/"
          style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}
        >
          Lost - Found
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: "white", border: "1px solid white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul
            className="navbar-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px", // Space between items
            }}
          >
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
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
                    href="/feed"
                  >
                    Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
                    href="/responses"
                  >
                    Responses
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
                    href="/mylistings"
                  >
                    My Listings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
                    href="/features"
                  >
                    Features
                  </a>
                </li>

                {/* Notification Bell Icon */}
                <li className="nav-item position-relative">
                  <button
                    className="btn btn-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "20px",
                      padding: "0",
                    }}
                    onClick={fetchNotifications} // Function to fetch notifications
                  >
                    <FaBell />
                  </button>
                  {notifications.length > 0 && (
                    <span
                      className="badge rounded-pill bg-danger"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        fontSize: "12px",
                      }}
                    >
                      {notifications.length}
                    </span>
                  )}
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
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

      {/* Show Notification Window when showNotifications is true */}
      {showNotifications && (
        <NotificationWindow
          notifications={notifications}
          onClose={closeNotifications} // Close the window on close button click
        />
      )}
    </nav>
  );
}

export default Navbar;
