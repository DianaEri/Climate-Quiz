import React from "react";
import LeafSVG from "./LeafSVG";

const QuizBackground = ({ currentQuestion, children }) => {
  const totalQuestions = 14;

  // Calculate the number of leaves to display
  const leavesCount = Math.min(currentQuestion + 1, totalQuestions);

  // Generate an array of positions for leaves
  const leaves = Array.from({ length: leavesCount }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`, // Random horizontal position
    top: `${Math.random() * 100}%`, // Random vertical position
    rotation: `${Math.random() * 360}deg`, // Random rotation
  }));

  return (
    <div
      style={{
        minHeight: "100vh", // Allow content to expand beyond the viewport
        width: "100%",
        background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)", // Base gradient
        position: "relative", // Keep leaves and content properly positioned
        overflow: "hidden", // Prevent leaves from overflowing
      }}
    >
      {/* Render leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          style={{
            position: "absolute",
            left: leaf.left,
            top: leaf.top,
            transform: `rotate(${leaf.rotation})`,
            animation: "fadeIn 0.5s ease", // Smooth entry animation
            transition: "all 0.5s ease", // Smooth position changes
          }}
        >
          <LeafSVG />
        </div>
      ))}
      <div
        style={{
          position: "relative", // Make sure child content scrolls
          zIndex: 2, // Ensure child content appears above leaves
          paddingBottom: "50px", // Add some padding at the bottom
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default QuizBackground;
