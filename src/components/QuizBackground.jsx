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
          minHeight: "100vh", // Allow scrolling if content exceeds height
          width: "100%", // Full-width background
          background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)", // Base gradient
          position: "relative", // Keep leaves positioned relative to the background
          overflowY: "auto", // Allow vertical scrolling
          overflowX: "hidden", // Prevent horizontal overflow
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
              animation: "fadeIn 0.5s ease", // Optional animation
            }}
          >
            <LeafSVG />
          </div>
        ))}
  
        {/* Render children (quiz content) */}
        <div>{children}</div>
      </div>
    );
  };
  
  export default QuizBackground;
  
