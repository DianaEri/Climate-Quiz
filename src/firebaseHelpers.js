import { db } from './firebase'; // Firebase initialization file
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import quizData from '../quizData.json'; // Path to your JSON file

// Save completed quizzes
export async function saveCompletedQuiz(userId, quizId) {
  console.log("Attempting to save quiz:", { userId, quizId });

  if (!userId || !quizId) {
    throw new Error("Invalid userId or quizId provided.");
  }

  const userRef = doc(db, 'users', userId);

  try {
    // Check if user document exists
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User document does not exist. Creating a new one...");
      await setDoc(userRef, { completedQuizzes: [] }); // Initialize with an empty array
    }

    // Add the completed quiz to the array without duplicate checks
    await updateDoc(userRef, {
      completedQuizzes: arrayUnion({
        quizId: quizId,
        completedAt: new Date().toISOString(),
      }),
    });

    console.log('Quiz saved successfully!');
  } catch (error) {
    console.error('Error saving quiz:', error.message);
    throw error;
  }
}

// Get completed quizzes
export async function getCompletedQuizzes(userId) {
  const userRef = doc(db, 'users', userId);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().completedQuizzes || [];
    } else {
      console.log('No such user!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching completed quizzes:', error);
    return [];
  }
}

// Get quiz details from quizData.json
export async function getQuizDetails(quizId) {
  try {
    console.log("Fetching details for quizId:", quizId); // Debugging log

    // Convert quizId to integer and filter questions
    const questions = quizData.filter(
      (question) => question.id === parseInt(quizId, 10)
    );

    console.log("Filtered questions:", questions); // Log filtered result

    if (questions.length === 0) {
      throw new Error("Quiz not found");
    }

    // Format and return the quiz details
    return {
      quizId,
      questions: questions.map((question) => ({
        text: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        chartData: question.chart_data || null,
      })),
    };
  } catch (error) {
    console.error("Error fetching quiz details:", error.message);
    throw error;
  }
}

