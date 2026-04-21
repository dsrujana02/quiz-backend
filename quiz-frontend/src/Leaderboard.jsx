import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

function Leaderboard() {
  const [data, setData] = useState([]);
  const currentUser = localStorage.getItem("username");
  const navigate = useNavigate();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    axios
      .get("http://localhost:8080/leaderboard/top")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);


  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const getColor = (index) => {
    if (index === 0) return "#FFD700";
    if (index === 1) return "#C0C0C0";
    if (index === 2) return "#CD7F32";
    return "#f5f5f5";
  };

  const barData = {
    labels: data.map((item) => item.username),
    datasets: [
      {
        label: "Scores",
        data: data.map((item) => item.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const current = data.find(
    (item) => item.username === currentUser
  );

  const pieData = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: current
          ? [current.score, current.total - current.score]
          : [0, 0],
        backgroundColor: ["#4CAF50", "#f44336"],
      },
    ],
  };
   return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🏆 Leaderboard
      </h1>

      {/* Leaderboard List */}
      {data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No scores yet</p>
      ) : (
        data.map((item, index) => {
          const isCurrentUser = item.username === currentUser;

          return (
            <div
              key={index}
              style={{
                background: isCurrentUser ? "#d4edda" : getColor(index),
                borderRadius: "12px",
                padding: "15px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                fontWeight: "bold",
              }}
            >
              <span>
                {getMedal(index)} #{index + 1} {item.username}
                {isCurrentUser && " (You)"}
              </span>

              <span>
                {item.score} / {item.total}
              </span>
            </div>
          );
        })
      )}

      {/* 📊 Bar Chart */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ textAlign: "center" }}>📊 Score Comparison</h3>
        <Bar data={barData} />
      </div>

      {/* 🥧 Pie Chart */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ textAlign: "center" }}> Your Performance</h3>
        <Pie data={pieData} />
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          style={{
            margin: "5px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2196F3",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔙 Back
        </button>

        {/* Refresh */}
        <button
          onClick={() => window.location.reload()}
          style={{
            margin: "5px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("username");
            navigate("/");
          }}
          style={{
            margin: "5px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#f44336",
            color: "white",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;