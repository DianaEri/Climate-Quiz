import { db } from './firebase'; // Firebase initialization file
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import quizData from '../quizData.json'; // Path to your JSON file

// Save completed quizzes
export async function saveCompletedQuiz(userId, quizId, userAnswers) {
  console.log("Attempting to save quiz:", { userId, quizId, userAnswers });

  if (!userId || !quizId || !userAnswers) {
    throw new Error("Invalid userId, quizId, or userAnswers provided.");
  }

  const userRef = doc(db, 'users', userId);

  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User document does not exist. Creating a new one...");
      await setDoc(userRef, { completedQuizzes: [] });
    }

    // Save the quiz with user answers
    await updateDoc(userRef, {
      completedQuizzes: arrayUnion({
        quizId: quizId,
        completedAt: new Date().toISOString(),
        userAnswers: userAnswers,
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
export async function getQuizDetails(quizId, userId) {
  try {
    console.log("Fetching details for quizId:", quizId); // Debugging log

    if (!userId) {
      throw new Error("Invalid userId provided. Ensure userId is passed correctly.");
    }

    // Fetch questions from quizData.json
    const questions = quizData.filter((question) => question.quizId === quizId);
    console.log("Filtered questions:", questions); // Log filtered result

    if (questions.length === 0) {
      throw new Error("Quiz not found");
    }

    // Fetch userAnswers from Firestore
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    let userAnswers = [];
    if (userSnap.exists()) {
      const completedQuiz = userSnap
        .data()
        .completedQuizzes?.find((quiz) => quiz.quizId === quizId);

      if (completedQuiz) {
        userAnswers = completedQuiz.userAnswers || [];
      } else {
        console.warn("No matching completed quiz found for quizId:", quizId);
      }
    } else {
      console.warn("User not found or no completed quizzes available.");
    }

    console.log("User Answers:", userAnswers);

    return {
      quizId,
      questions: questions.map((question) => ({
        id: question.id, // Ensure question IDs are included
        text: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        chartData: question.chart_data || null,
      })),
      userAnswers, // Include user answers or fallback to an empty array
    };
  } catch (error) {
    console.error("Error fetching quiz details:", error.message);
    throw error;
  }
}
