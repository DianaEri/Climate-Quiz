// Importerar funktioner från Firebase Firestore och annan nödvändig kod
import { db } from './firebase'; // Firebase-initialisering
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; // Firestore funktioner för att läsa och skriva data
import { v4 as uuidv4 } from "uuid"; // För att generera unika identifierare
import quizData from '../quizData.json'; // Vägen till JSON-filen med quizdata

// Funktion för att spara genomförda quiz
export async function saveCompletedQuiz(userId, quizId, userAnswers, score, totalQuestions) {
  console.log("Försöker spara quiz:", { userId, quizId, userAnswers, score, totalQuestions });

  // Validerar att alla nödvändiga parametrar finns
  if (!userId || !quizId || !userAnswers || score === undefined || totalQuestions === undefined) {
    throw new Error("Ogiltigt userId, quizId, userAnswers, score eller totalQuestions angivna.");
  }

  const userRef = doc(db, 'users', userId); // Hämtar referens till användardokumentet i Firestore

  try {
    const userSnap = await getDoc(userRef); // Hämtar dokumentet för användaren

    if (!userSnap.exists()) {
      console.log("Användardokumentet finns inte. Skapar ett nytt...");
      await setDoc(userRef, { completedQuizzes: [] }); // Om användaren inte finns, skapa ett nytt dokument
    }

    const completedQuizId = uuidv4(); // Generera ett unikt ID för detta genomförda quiz

    // Uppdatera användardokumentet med genomfört quiz
    await updateDoc(userRef, {
      completedQuizzes: arrayUnion({
        completedQuizId, // Unikt ID för det genomförda quizet
        quizId,
        completedAt: new Date().toISOString(), // Sätt tiden för när quizet genomfördes
        userAnswers,
        score, // Spara användarens poäng
        totalQuestions // Spara antalet frågor i quizet
      }),
    });

    console.log('Quiz sparades framgångsrikt med ID:', completedQuizId);
    return completedQuizId; // Returnera det unika ID:t för vidare användning
  } catch (error) {
    console.error('Fel vid sparande av quiz:', error.message);
    throw error; // Kasta vidare felet om något går fel
  }
}

// Funktion för att hämta genomförda quiz för en användare
export async function getCompletedQuizzes(userId) {
  // Validerar att användar-ID är angivet
  if (!userId) {
    throw new Error("Ogiltigt userId angivet.");
  }

  const userRef = doc(db, 'users', userId); // Hämtar referens till användardokumentet

  try {
    const userSnap = await getDoc(userRef); // Hämtar dokumentet för användaren
    if (userSnap.exists()) {
      const completedQuizzes = userSnap.data().completedQuizzes || []; // Hämta listan över genomförda quiz
      console.log(`Genomförda quiz för användare ${userId}:`, completedQuizzes);
      return completedQuizzes; // Returnera listan med genomförda quiz
    } else {
      console.log('Användardokument hittades inte i Firestore.');
      return []; // Returnera en tom lista om användaren inte finns
    }
  } catch (error) {
    console.error('Fel vid hämtning av genomförda quiz:', error.message);
    return []; // Returnera en tom lista om något går fel
  }
}

// Funktion för att hämta detaljer om ett specifikt quiz från både quizData.json och Firestore
export async function getQuizDetails(quizId, userId, completedQuizId) {
  try {
    console.log("Hämtar detaljer för quizId:", quizId, "userId:", userId, "completedQuizId:", completedQuizId);

    // Validerar att både userId och completedQuizId är angivna
    if (!userId || !completedQuizId) {
      throw new Error("Ogiltigt userId eller completedQuizId angivet.");
    }

    // Hämta frågor från quizData.json baserat på quizId
    const questions = quizData.filter((question) => question.quizId === quizId);
    console.log("Filtrerade frågor:", questions);

    if (questions.length === 0) {
      throw new Error(`Quiz med ID ${quizId} hittades inte i quizData.json.`);
    }

    // Hämta genomförda quiz från Firestore
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    let userAnswers = [];
    let completedQuiz = null; // Se till att completedQuiz är initialt null

    if (userSnap.exists()) {
      const completedQuizzes = userSnap.data().completedQuizzes || [];
      console.log(`Genomförda quiz för användare ${userId}:`, completedQuizzes);

      // Matcha quizet med quizId och completedQuizId
      completedQuiz = completedQuizzes.find(
        (quiz) => quiz.quizId === quizId && quiz.completedQuizId === completedQuizId
      );

      if (completedQuiz) {
        console.log("Matchande genomfört quiz hittades:", completedQuiz);
        userAnswers = completedQuiz.userAnswers || [];
        console.log("Användarens svar hämtades:", userAnswers);
      } else {
        console.warn(`Inget matchande genomfört quiz hittades för completedQuizId: ${completedQuizId}`);
      }
    } else {
      console.warn(`Användardokumentet hittades inte i Firestore för userId: ${userId}`);
    }

    // Om completedQuiz inte hittades, kasta ett fel
    if (!completedQuiz) {
      throw new Error(`Genomfört quiz med ID ${completedQuizId} hittades inte.`);
    }

    // Returnera quizdetaljerna tillsammans med användarens svar, poäng och totalt antal frågor
    return {
      quizId,
      questions: questions.map((question) => ({
        id: question.id,
        text: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        chartData: question.chart_data || null, // Om det finns diagramdata, inkludera det
      })),
      userAnswers,
      score: completedQuiz.score || 0,
      totalQuestions: completedQuiz.totalQuestions || 0,
    };
  } catch (error) {
    console.error("Fel vid hämtning av quizdetaljer:", error.message);
    throw error; // Kasta felet vidare om något gick fel
  }
}
