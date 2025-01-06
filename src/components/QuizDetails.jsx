import React, { useEffect, useState } from 'react';
import { getQuizDetails } from '../firebaseHelpers'; // Import the function from helpers

function QuizDetails({ userId, quizId, onBackToCompletedQuizzes }) {
    const [quizDetails, setQuizDetails] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            const data = await getQuizDetails(quizId);
            console.log("Fetched quiz details:", data); // Debugging log
            setQuizDetails(data);
        }
        fetchDetails();
    }, [quizId]);

    if (!quizDetails) {
        return <p>Laddar quizdetaljer...</p>;
    }

    if (!quizDetails.userAnswers || !Array.isArray(quizDetails.userAnswers)) {
        console.warn("userAnswers is missing or not an array:", quizDetails.userAnswers);
        return <p>Inga användarsvar tillgängliga för detta quiz.</p>;
    }

    return (
        <div>
            <h1>Quizdetaljer</h1>
            <p>Quiz ID: {quizId}</p>
            <ul>
                {quizDetails.questions.map((question, index) => {
                    const userAnswer = quizDetails.userAnswers.find(
                        (ans) => ans.questionId === question.id
                    )?.userAnswer || "Ingen svar";

                    return (
                        <li key={index}>
                            <p>{question.text}</p>
                            <p><strong>Rätt svar:</strong> {question.correctAnswer}</p>
                            <p><strong>Ditt svar:</strong> {userAnswer}</p>
                        </li>
                    );
                })}
            </ul>
            <button onClick={onBackToCompletedQuizzes}>Tillbaka till Avklarade Quiz</button>
        </div>
    );
}

export default QuizDetails;
