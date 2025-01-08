import { db } from './firebase'; // Firebase initialization file
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // For generating unique identifiers
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

    const completedQuizId = uuidv4(); // Generate a unique ID for this completed quiz

    // Calculate score and total questions
    const totalQuestions = userAnswers.length;
    const score = userAnswers.filter(ans => ans.isCorrect).length; // Assuming `isCorrect` is a boolean in the answer object

    // Save the quiz with user answers, score, and total questions
    await updateDoc(userRef, {
      completedQuizzes: arrayUnion({
        completedQuizId, // Unique ID for this completed quiz
        quizId,
        completedAt: new Date().toISOString(),
        userAnswers,
        score, // Save the score
        totalQuestions // Save the total number of questions
      }),
    });

    console.log('Quiz saved successfully with ID:', completedQuizId);
    return completedQuizId; // Return the unique ID for further use
  } catch (error) {
    console.error('Error saving quiz:', error.message);
    throw error;
  }
}

// Get completed quizzes
export async function getCompletedQuizzes(userId) {
  if (!userId) {
    throw new Error("Invalid userId provided.");
  }

  const userRef = doc(db, 'users', userId);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const completedQuizzes = userSnap.data().completedQuizzes || [];
      console.log(`Completed quizzes for user ${userId}:`, completedQuizzes);
      return completedQuizzes;
    } else {
      console.log('No user document found in Firestore.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching completed quizzes:', error.message);
    return [];
  }
}

// Get quiz details from quizData.json and Firestore
export async function getQuizDetails(quizId, userId, completedQuizId) {
  try {
    console.log("Fetching details for quizId:", quizId, "userId:", userId, "completedQuizId:", completedQuizId);

    if (!userId || !completedQuizId) {
      throw new Error("Invalid userId or completedQuizId provided.");
    }

    // Fetch questions from quizData.json
    const questions = quizData.filter((question) => question.quizId === quizId);
    console.log("Filtered questions:", questions);

    if (questions.length === 0) {
      throw new Error(`Quiz with ID ${quizId} not found in quizData.json.`);
    }

    // Fetch userAnswers from Firestore
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    let userAnswers = [];
    if (userSnap.exists()) {
      const completedQuizzes = userSnap.data().completedQuizzes || [];
      console.log(`Completed quizzes for user ${userId}:`, completedQuizzes);

      // Match quiz using quizId and completedQuizId
      const completedQuiz = completedQuizzes.find(
        (quiz) => quiz.quizId === quizId && quiz.completedQuizId === completedQuizId
      );

      if (completedQuiz) {
        console.log("Matching completed quiz found:", completedQuiz);
        userAnswers = completedQuiz.userAnswers || [];
        console.log("User Answers Retrieved:", userAnswers);
      } else {
        console.warn(`No matching completed quiz found for completedQuizId: ${completedQuizId}`);
      }
    } else {
      console.warn(`User document not found in Firestore for userId: ${userId}`);
    }

    return {
      quizId,
      questions: questions.map((question) => ({
        id: question.id,
        text: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        chartData: question.chart_data || null,
      })),
      userAnswers, // Include user answers
      score: completedQuiz?.score || 0, // Include score if available
      totalQuestions: completedQuiz?.totalQuestions || 0, // Include total questions if available
    };
  } catch (error) {
    console.error("Error fetching quiz details:", error.message);
    throw error;
  }
}
