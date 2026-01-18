import React, { useEffect } from "react";

const SendLocation = () => {

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location:", latitude, longitude);

          // Send location to backend
          fetch("http://localhost:5000/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Server response:", data);
            })
            .catch((err) => {
              console.error("Error sending location:", err);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);

  return <div>Sending your location...</div>;
};

export default SendLocation;
