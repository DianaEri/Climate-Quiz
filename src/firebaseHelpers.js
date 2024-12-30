import { db } from './firebase'; // Firebase initialization file
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

// Save completed quizzes
export async function saveCompletedQuiz(userId, quizId) {
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, {
      completedQuizzes: arrayUnion({
        quizId: quizId,
        completedAt: new Date().toISOString(),
      }),
    });
    console.log('Quiz saved successfully!');
  } catch (error) {
    console.error('Error saving quiz: ', error);
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
