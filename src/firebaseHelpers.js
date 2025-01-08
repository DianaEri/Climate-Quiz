import { db } from './firebase'; // Firebase initialization file
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // For generating unique identifiers
import quizData from '../quizData.json'; // Path to your JSON file

// Save completed quizzes
export async function saveCompletedQuiz(userId, quizId, userAnswers, score, totalQuestions) {
  console.log("Attempting to save quiz:", { userId, quizId, userAnswers, score, totalQuestions });

  if (!userId || !quizId || !userAnswers || score === undefined || totalQuestions === undefined) {
    throw new Error("Invalid userId, quizId, userAnswers, score, or totalQuestions provided.");
  }

  const userRef = doc(db, 'users', userId);

  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User document does not exist. Creating a new one...");
      await setDoc(userRef, { completedQuizzes: [] });
    }

    const completedQuizId = uuidv4(); // Generate a unique ID for this completed quiz

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

    // Fetch completed quizzes from Firestore
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    let userAnswers = [];
    let completedQuiz = null; // Make sure completedQuiz is initially null

    if (userSnap.exists()) {
      const completedQuizzes = userSnap.data().completedQuizzes || [];
      console.log(`Completed quizzes for user ${userId}:`, completedQuizzes);

      // Match quiz using quizId and completedQuizId
      completedQuiz = completedQuizzes.find(
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

    // If completedQuiz is not found, throw an error
    if (!completedQuiz) {
      throw new Error(`Completed quiz with ID ${completedQuizId} not found.`);
    }

    // Return the quiz details along with user answers, score, and totalQuestions
    return {
      quizId,
      questions: questions.map((question) => ({
        id: question.id,
        text: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        chartData: question.chart_data || null,
      })),
      userAnswers,
      score: completedQuiz.score || 0,
      totalQuestions: completedQuiz.totalQuestions || 0,
    };
  } catch (error) {
    console.error("Error fetching quiz details:", error.message);
    throw error;
  }
}
