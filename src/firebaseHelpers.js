import { db } from './firebase'; // Firebase initialization file
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

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
    console.error('Error fetching completed quizzes: ', error);
    return [];
  }
}
