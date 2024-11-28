import React from "react";

const NotificationWindow = ({ notifications, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "12.5%",
        left: "12.5%",
        width: "75%",
        height: "75%",
        backgroundColor: "white",
        zIndex: 1050,
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        overflowY: "auto",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "24px",
          color: "#666",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        &times;
      </button>

      {/* Header */}
      <h3
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Notifications
      </h3>

      {/* Notification List */}
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Item Image */}
              {notification.itemId?.itemPictures &&
                notification.itemId.itemPictures.length > 0 && (
                  <img
                    src={`data:${notification.itemId.itemPictures[0].contentType};base64,${notification.itemId.itemPictures[0].data}`}
                    alt="Item"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                )}

              {/* Notification Details */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {notification.itemId?.name || "N/A"}
                </p>
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  <strong>Description:</strong>{" "}
                  {notification.itemId?.description || "No description provided."}
                </p>
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  <strong>Type:</strong> {notification.itemId?.type || "Unknown"}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            No new notifications.
          </p>
        )}
      </ul>
    </div>
  );
};

export default NotificationWindow;
