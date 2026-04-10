import React, { useState } from "react";
import socket from "../services/socket";

const AnswerBox = () => {
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    // ❌ empty validation
    if (!name || !answer) {
      setError("⚠️ Please enter both name and answer");
      return;
    }

    // ❌ negative validation
    if (parseInt(answer) < 0) {
      setError("❌ Negative numbers not allowed");
      return;
    }

    setError("");
    socket.emit("submit_answer", { name, answer });
    setAnswer("");
  };

  return (
    <div className="answer-box">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={submit}>Submit</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AnswerBox;