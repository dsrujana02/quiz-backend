import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    alert("Button Clicked");
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    navigate("/quiz", {
      state: { username: name }
    });
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "150px"
      }}
    >
      <h1> Quiz App</h1>

      <h3>Enter your name</h3>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "200px",
          marginBottom: "20px"
        }}
      />

      <br />

      <button
        onClick={startQuiz}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Start;