import React, { useState, useEffect } from "react";
import LeafSVG from "./LeafSVG";

const QuizBackground = ({ currentQuestion }) => {
  const totalQuestions = 14;

  const edgePositions = [
    { left: "0%", top: "5%" },
    { left: "0%", top: "95%" },
    { left: "5%", top: "0%" },
    { left: "95%", top: "0%" },
    { left: "95%", top: "95%" },
    { left: "5%", top: "95%" },
    { left: "50%", top: "0%" },
    { left: "50%", top: "95%" },
    { left: "0%", top: "50%" },
    { left: "95%", top: "50%" },
    { left: "10%", top: "10%" },
    { left: "90%", top: "10%" },
    { left: "10%", top: "90%" },
    { left: "90%", top: "90%" },
  ];

  const [usedPositions, setUsedPositions] = useState([]);

  useEffect(() => {
    const newPositionIndex = usedPositions.length;
    if (newPositionIndex < edgePositions.length) {
      setUsedPositions((prev) => [...prev, edgePositions[newPositionIndex]]);
    }
  }, [currentQuestion]);

  return (
    <div
      className="quiz-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom left, #2f4b2f, #4a6b3e, #6f8d4f)",
        overflow: "hidden",
        zIndex: -1, // Stay behind the content
      }}
    >
      {usedPositions.map((position, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: "fadeIn 0.5s ease",
          }}
        >
          <LeafSVG />
        </div>
      ))}
    </div>
  );
};

export default QuizBackground;
