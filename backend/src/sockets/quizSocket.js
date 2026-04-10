import { generateQuestion } from "../services/questionGenerator.js";
import User from "../models/User.js";

let currentQuestion = generateQuestion();
let isAnswered = false;

const initSocket = (io) => {
    io.on("connection", async (socket) => {
        // ✅ send leaderboard on join
        const leadersOnJoin = await User.find()
            .sort({ score: -1 })
            .limit(5);

        socket.emit("leaderboard", leadersOnJoin);


        socket.on("get_question", async () => {
            socket.emit("new_question", currentQuestion.question);

            const leaders = await User.find()
                .sort({ score: -1 })
                .limit(5);

            socket.emit("leaderboard", leaders);
        });

        socket.on("submit_answer", async ({ name, answer }) => {
            if (!name || answer === undefined) return;

            const numericAnswer = parseInt(answer);

            // ❌ negative validation
            if (numericAnswer < 0) {
                socket.emit("wrong_answer", " Negative answers not allowed");
                return;
            }

            // 🚫 already answered
            if (isAnswered) return;

            if (numericAnswer === currentQuestion.answer) {
                isAnswered = true;

                let user = await User.findOne({ name });

                if (!user) {
                    user = new User({ name, score: 1 });
                } else {
                    user.score += 1;
                }

                await user.save();

                // ✅ leaderboard update AFTER save
                const leaders = await User.find()
                    .sort({ score: -1 })
                    .limit(5);

                io.emit("leaderboard", leaders);

                io.emit("winner", {
                    name,
                    correctAnswer: currentQuestion.answer,
                });


                // generate next question
                currentQuestion = generateQuestion();

                setTimeout(() => {
                    isAnswered = false;
                    io.emit("new_question", currentQuestion.question);
                }, 1500);
            }

            // ❌ WRONG ANSWER
            else {
                let user = await User.findOne({ name });

                if (user && user.score > 0) {
                    user.score -= 1;
                    await user.save();
                }

                // ✅ leaderboard AFTER update
                const leaders = await User.find()
                    .sort({ score: -1 })
                    .limit(5);

                io.emit("leaderboard", leaders);

                socket.emit("wrong_answer", " Wrong answer! -1 point");


                // 🔄 generate new question immediately
                currentQuestion = generateQuestion();
                isAnswered = false;

                setTimeout(() => {
                    io.emit("new_question", currentQuestion.question);
                }, 100);
            }
        });

        socket.on("disconnect", () => {
            console.log(`🔴 User disconnected: ${socket.id}`);
        });
    });
};

export default initSocket;