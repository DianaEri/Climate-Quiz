import React, { useState, useEffect } from "react";
import LeafSVG from "./LeafSVG";

const QuizBackground = ({ currentQuestion }) => {
  const totalQuestions = 14;

  // Predefined edge positions
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
  const [processedQuestions, setProcessedQuestions] = useState(new Set());

  // Helper to calculate the Euclidean distance between two positions
  const calculateDistance = (pos1, pos2) => {
    const x1 = parseFloat(pos1.left);
    const y1 = parseFloat(pos1.top);
    const x2 = parseFloat(pos2.left);
    const y2 = parseFloat(pos2.top);
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  const getUniquePositions = (count = 2, minDistance = 10) => {
    const availablePositions = edgePositions.filter(
      (pos) =>
        !usedPositions.some(
          (usedPos) => usedPos.left === pos.left && usedPos.top === pos.top
        )
    );

    const selectedPositions = [];
    while (selectedPositions.length < count && availablePositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const candidatePosition = availablePositions[randomIndex];

      // Check if the candidate position is far enough from selected and used positions
      const isValid = [...selectedPositions, ...usedPositions].every(
        (pos) => calculateDistance(candidatePosition, pos) >= minDistance
      );

      if (isValid) {
        selectedPositions.push(candidatePosition);
      }

      // Remove the candidate position from availablePositions to prevent infinite loops
      availablePositions.splice(randomIndex, 1);
    }

    return selectedPositions;
  };

  useEffect(() => {
    if (
      !processedQuestions.has(currentQuestion) &&
      usedPositions.length < edgePositions.length
    ) {
      const newPositions = getUniquePositions(2); // Get two unique positions
      setUsedPositions((prev) => [...prev, ...newPositions]);
      setProcessedQuestions((prev) => new Set(prev).add(currentQuestion));
    }
  }, [currentQuestion, processedQuestions, usedPositions]);

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
            pointerEvents: "none", // Prevent interaction
          }}
        >
          <LeafSVG />
        </div>
      ))}
    </div>
  );
};

export default QuizBackground;
