import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import AnswerBox from "./AnswerBox";
import Leaderboard from "./Leaderboard";
import { toast } from "react-toastify";

const Quiz = () => {
    const [question, setQuestion] = useState("");
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("🟢 Connected");
            socket.emit("get_question");
        });

        socket.on("new_question", (q) => {
            setQuestion(q);
            setWinner(null);
        });

        socket.on("winner", (data) => {
            setWinner(data);
        });

        socket.on("wrong_answer", (msg) => {
            toast.error(msg);
        });

        return () => {
            socket.off();
        };
    }, []);


    return (
        <div className="quiz-container">
            <div className="question-card">
                <h2>Question:</h2>
                <p className="question">{question}</p>

                {winner ? (
                    <div className="winner">
                        🏆 {winner.name} answered correctly!
                    </div>
                ) : (
                    <AnswerBox />
                )}
            </div>

            <Leaderboard />
        </div>
    );
};

export default Quiz;