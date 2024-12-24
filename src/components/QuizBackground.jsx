import React from "react";

// Import all backgrounds
import quiz_bg1 from "../assets/quiz_bg1.svg";
import quiz_bg2 from "../assets/quiz_bg2.svg";
import quiz_bg3 from "../assets/quiz_bg3.svg";
import quiz_bg4 from "../assets/quiz_bg4.svg";
import quiz_bg5 from "../assets/quiz_bg5.svg";
import quiz_bg6 from "../assets/quiz_bg6.svg";
import quiz_bg7 from "../assets/quiz_bg7.svg";
import quiz_bg8 from "../assets/quiz_bg8.svg";
import quiz_bg9 from "../assets/quiz_bg9.svg";
import quiz_bg10 from "../assets/quiz_bg10.svg";
import quiz_bg11 from "../assets/quiz_bg11.svg";
import quiz_bg12 from "../assets/quiz_bg12.svg";
import quiz_bg13 from "../assets/quiz_bg13.svg";
import quiz_bg14 from "../assets/quiz_bg14.svg";

const backgrounds = [
    quiz_bg1, quiz_bg2, quiz_bg3, quiz_bg4, quiz_bg5,
    quiz_bg6, quiz_bg7, quiz_bg8, quiz_bg9, quiz_bg10,
    quiz_bg11, quiz_bg12, quiz_bg13, quiz_bg14
];

const QuizBackground = ({ currentQuestion }) => {
    const backgroundIndex = Math.min(currentQuestion, backgrounds.length - 1); // Ensure index is within bounds
    const currentBackground = backgrounds[backgroundIndex];

    return (
        <div
            className="quiz-background"
            style={{
                backgroundImage: `url(${currentBackground})`, // Dynamically set background image
            }}
        >
            {/* Optional: Add any decorative elements here */}
        </div>
    );
};

export default QuizBackground;
