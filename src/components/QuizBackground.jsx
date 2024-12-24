import React, { useState, useEffect } from "react";
import LeafSVG from "./LeafSVG";

const QuizBackground = ({ currentQuestion }) => {
  const totalQuestions = 14;

  // Add more positions to accommodate 28 leaves
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
    // Add more positions
    { left: "20%", top: "20%" },
    { left: "80%", top: "20%" },
    { left: "20%", top: "80%" },
    { left: "80%", top: "80%" },
    { left: "30%", top: "30%" },
    { left: "70%", top: "30%" },
    { left: "30%", top: "70%" },
    { left: "70%", top: "70%" },
    { left: "40%", top: "40%" },
    { left: "60%", top: "40%" },
    { left: "40%", top: "60%" },
    { left: "60%", top: "60%" },
  ];

  const [usedPositions, setUsedPositions] = useState([]);
  const [processedQuestions, setProcessedQuestions] = useState(new Set());

  const calculateDistance = (pos1, pos2) => {
    const x1 = parseFloat(pos1.left);
    const y1 = parseFloat(pos1.top);
    const x2 = parseFloat(pos2.left);
    const y2 = parseFloat(pos2.top);
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  const getUniquePositions = (count = 2, minDistance = 10) => {
    let availablePositions = edgePositions.filter(
      (pos) =>
        !usedPositions.some(
          (usedPos) => usedPos.left === pos.left && usedPos.top === pos.top
        )
    );

    const selectedPositions = [];
    while (selectedPositions.length < count) {
      if (availablePositions.length === 0) {
        // If we run out of unique positions, reset available positions
        availablePositions = [...edgePositions];
      }

      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const candidatePosition = availablePositions[randomIndex];

      const isValid = [...selectedPositions, ...usedPositions].every(
        (pos) => calculateDistance(candidatePosition, pos) >= minDistance
      );

      if (isValid) {
        selectedPositions.push(candidatePosition);
      }

      availablePositions.splice(randomIndex, 1);
    }

    return selectedPositions;
  };

  useEffect(() => {
    if (usedPositions.length < edgePositions.length) {
        // Add new positions for two leaves, ensuring they are not too close
        const nextPositions = edgePositions
            .filter((_, index) => !usedPositions.some((pos) => pos === edgePositions[index]))
            .slice(0, 2); // Add 2 positions
 
        setUsedPositions((prev) => [...prev, ...nextPositions]);
    }
 }, [currentQuestion]);

  return (
    <div className="quiz-background">
      {usedPositions.map((position, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: "fadeIn 0.5s ease",
            pointerEvents: "none",
          }}
        >
          <LeafSVG />
        </div>
      ))}
    </div>
  );
};

export default QuizBackground;
