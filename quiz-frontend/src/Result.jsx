import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, wrong, percentage, resultDetails, username } =
    location.state || {};
    console.log("Username in Result:", username);
  const saveScore = async () => {
    console.log("username before sending:", username);
    try {
      await
      axios.post("http://localhost:8080/leaderboard/save", {
        username: username,
        score: score,
        total: total
      });
      console.log("Saved Successfully");
    }
    catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Result</h1>

      {/* ✅ Card */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2>
          Score: {score} / {total}
        </h2>

        <h3>Percentage: {percentage}%</h3>

        {percentage >= 80 && ( <p style ={{color: "green", fontWeight: "bold"}}>EXCELLENT</p>)}
        {percentage>=50 && (<p style={{ color:"orange", fontWeight: "bold"}}> GOOD</p>)}
        {percentage <50 && (<p style ={{ color:"red", fontWeight: "bold"}}> NEED IMPROVEMENT</p>)}
        { percentage >=50 ? ( <p style={{ color: "green", fontSize: "18px" }}>
            Pass ✅
          </p>
        ) : (
          <p style={{ color: "red", fontSize: "18px" }}>
            Fail ❌
          </p>
        )}
      </div>

      {/*  Detailed Analysis */}
      <h2>Detailed Analysis</h2>

      {resultDetails &&
        resultDetails.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "15px",
              textAlign: "left",
            }}
          >
            <p>
              <b>Q{index + 1}:</b> {item.question}
            </p>

            <p>Your Answer: {item.selectedAnswer}</p>
            <p>Correct Answer: {item.correctAnswer}</p>

            {item.isCorrect ? (
              <p style={{ color: "green" }}>✔ Correct</p>
            ) : (
              <p style={{ color: "red" }}>✘ Wrong</p>
            )}
          </div>
        ))}

      {/* Button */}
      <div style={{ marginTop: "20px" }}>
         <button
         onClick={async() => {await saveScore(); navigate("/leaderboard");}}
         style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px",
        }}
        >
          View Leaderboard
          </button>
           <button
           onClick={() => navigate("/")}
           style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          >
            Try Again
            </button>
            </div>
    </div>
  );
}

export default Result;