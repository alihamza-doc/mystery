import React, { useState } from "react";

const SendLocation = () => {
  const [status, setStatus] = useState("idle");

  const sendLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    setStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);

        try {
          const res = await fetch(
            "https://mystery-e6o2.onrender.com/location",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ latitude, longitude }),
            }
          );

          const data = await res.json();
          console.log("Server response:", data);

          setStatus("success");
        } catch (err) {
          console.error("Error sending location:", err);
          setStatus("failed");
        }
      },
      (error) => {
        console.error("Geolocation error:", error.code, error.message);

        if (error.code === 1) setStatus("Permission denied");
        else if (error.code === 2) setStatus("Location unavailable");
        else if (error.code === 3) setStatus("Location timeout");
        else setStatus("Location error");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Share your location</h3>

      <button
        onClick={sendLocation}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Allow Location
      </button>

      <p style={{ marginTop: "10px" }}>
        {status === "idle" && "Waiting for permission"}
        {status === "requesting" && "Requesting location..."}
        {status === "success" && "Location sent successfully"}
        {status === "failed" && "Failed to send location"}
        {status.includes("Permission") && status}
      </p>
    </div>
  );
};

export default SendLocation;
