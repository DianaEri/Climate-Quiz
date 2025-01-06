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

    // If the document exists, check for duplicates
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const alreadyCompleted = userData.completedQuizzes?.some(
        (quiz) => quiz.quizId === quizId
      );

      if (alreadyCompleted) {
        console.log("Quiz already saved.");
        return; // Prevent duplicate save
      }
    }

    // Update the completedQuizzes array
    await updateDoc(userRef, {
      completedQuizzes: arrayUnion({
        quizId: quizId,
        completedAt: new Date().toISOString(),
      }),
    });

    console.log('Quiz saved successfully!');
  } catch (error) {
    console.error('Error saving quiz:', error.message);
    throw error; // Re-throw for higher-level error handling
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
    // Simulate a delay (optional, for asynchronous behavior)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter the questions for the given quizId
    const questions = quizData.filter((question) => question.id === parseInt(quizId, 10));

    if (questions.length === 0) {
      throw new Error('Quiz not found');
    }

    // Format and return the quiz details
    return {
      quizId,
      questions: questions.map((question) => ({
        text: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        chartData: question.chart_data || null, // Include chart data if available
      })),
    };
  } catch (error) {
    console.error('Error fetching quiz details:', error.message);
    throw error;
  }
}
