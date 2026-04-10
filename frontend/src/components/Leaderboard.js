import React, { useEffect, useState } from "react";
import socket from "../services/socket";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    socket.on("leaderboard", (data) => {
      setLeaders([...data]);
    });

    return () => socket.off("leaderboard");
  }, []);

 return (
  <div className="leaderboard">
    <h3 className="leaderboard-title">🏆 Leaderboard</h3>

    <div className="leaderboard-list"> 
      {leaders.map((user, index) => (
        <div key={index} className="leader-card">
          <div className="rank">#{index + 1}</div>
          <div className="name">{user.name}</div>
          <div className="score">{user.score}</div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Leaderboard;