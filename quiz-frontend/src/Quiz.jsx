import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30); 
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "User";
  useEffect(() => {
    console.log("Username:", username);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/question/random/5")
      .then((res) =>{
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); 
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  
  const handleOptionChange = (qId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: answer
    });
  };

  
  const handleSubmit = () => {
    let score = 0;
    let resultDetails=[];

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const correct = q.rightAnswer;

      if (
        selected?.trim().toLowerCase() ===
        correct?.trim().toLowerCase()
      ) {
        score++;
      }

      resultDetails.push({
        question: q.questionTitle,
        selectedAnswer: selected,
        correctAnswer: correct,
        isCorrect:
          selected?.trim().toLowerCase() ===
          correct?.trim().toLowerCase(),
      });
    });

    const total = questions.length;
    const wrong = total - score;
    const percentage = ((score / total) * 100).toFixed(2);

    navigate("/result", {
      state: {
        score,
        total,
        wrong,
        percentage,
        resultDetails,
        username,
      },
    });
  };

  const answered = Object.keys(selectedAnswers).length;
  const total = questions.length;
  const progress = total === 0 ? 0 : (answered / total) * 100;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Quiz App</h1>

      {/* ✅ Timer */}
      <h2 style={{ textAlign: "right", color: timeLeft<=5 ? "red" : "black", fontWeight: timeLeft<=5 ? "bold": "normal" }}>
        ⏱ {timeLeft}s
        {timeLeft <= 5 && (
          <p style={{ color: "red", textAlign: "right" }}>
            Hurry up! Time is almost over ⏳
            </p>
          )}
      </h2>

      {/* ✅ Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <p>
          Answered {answered} / {total}
        </p>

        <div
          style={{
            height: "10px",
            background: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #4CAF50, #81C784)",
              transition: "width 0.4s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      {/* ✅ Questions */}
      {questions.map((q, index) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            Q{index + 1}. {q.questionTitle}
          </h3>

          {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
            <label key={i} style={{ display: "block", margin: "8px 0" }}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(q.id, e.target.value)
                }
              />
              {" "} {opt}
            </label>
          ))}
        </div>
      ))}

      {/* ✅ Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={answered === 0}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;