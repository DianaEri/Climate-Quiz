import React, { useState, useEffect } from "react";

// Import all backgrounds
import quiz_bg1 from "../assets/quiz_bg1.png";
import quiz_bg2 from "../assets/quiz_bg2.png";
import quiz_bg3 from "../assets/quiz_bg3.png";
import quiz_bg4 from "../assets/quiz_bg4.png";
import quiz_bg5 from "../assets/quiz_bg5.png";
import quiz_bg6 from "../assets/quiz_bg6.png";
import quiz_bg7 from "../assets/quiz_bg7.png";
import quiz_bg8 from "../assets/quiz_bg8.png";
import quiz_bg9 from "../assets/quiz_bg9.png";
import quiz_bg10 from "../assets/quiz_bg10.png";
import quiz_bg11 from "../assets/quiz_bg11.png";
import quiz_bg12 from "../assets/quiz_bg12.png";
import quiz_bg13 from "../assets/quiz_bg13.png";
import quiz_bg14 from "../assets/quiz_bg14.png";

const backgrounds = [
  quiz_bg1, quiz_bg2, quiz_bg3, quiz_bg4, quiz_bg5,
  quiz_bg6, quiz_bg7, quiz_bg8, quiz_bg9, quiz_bg10,
  quiz_bg11, quiz_bg12, quiz_bg13, quiz_bg14
];

const QuizBackground = ({ currentQuestion }) => {
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  // Preload images on component mount
  useEffect(() => {
    backgrounds.forEach((bg) => {
      const img = new Image();
      img.src = bg;
    });
  }, []);

  useEffect(() => {
    // Change background when the question changes
    const backgroundIndex = Math.min(currentQuestion, backgrounds.length - 1);
    setCurrentBackground(backgrounds[backgroundIndex]);
  }, [currentQuestion]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1, // Ensure it stays behind the quiz content
        transition: "background-image 0.5s ease-in-out", // Smooth transition
      }}
    />
  );
};

export default QuizBackground;
