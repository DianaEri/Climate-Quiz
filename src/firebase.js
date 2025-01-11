// Importerar funktioner från SDK:erna vi behöver
import { initializeApp } from 'firebase/app'; // För att initiera Firebase-applikationen
import { getFirestore } from "firebase/firestore"; // För att hämta Firestore-funktioner
import { getAuth } from 'firebase/auth'; // För att importera autentisering
import { getAnalytics } from 'firebase/analytics'; // För att importera analytics

// Vår webbsidas Firebase-konfiguration
const firebaseConfig = {
  apiKey: 'AIzaSyB3TT0zMdvSJrFqAqdZUUSjf_GFRJfozcg', // API-nyckel för Firebase-projektet
  authDomain: 'climate-quiz-b2393.firebaseapp.com', // Autentiseringsdomän för Firebase
  projectId: 'climate-quiz-b2393', // Firebase-projekt-ID
  storageBucket: 'climate-quiz-b2393.firebasestorage.app', // Firebase lagringsområde
  messagingSenderId: '622521437292', // Sändar-ID för meddelanden
  appId: '1:622521437292:web:b809eb53da323b3bdedc49', // App-ID för Firebase-applikationen
  measurementId: 'G-1D2PHPGT6T', // Mät-ID för Analytics
};

// Initierar Firebase med den tidigare konfigurerade inställningen
const app = initializeApp(firebaseConfig);

// Initierar Firestore (databas) för att kunna läsa och skriva data
export const db = getFirestore(app); // Exporterar Firestore-instansen så den kan användas i andra delar av applikationen

// Initierar Authentication (Autentisering) för att hantera användarinloggningar och användarhantering
export const auth = getAuth(app); // Exporterar auth-objektet för autentisering

// Initierar Analytics (analysfunktioner) för att samla in användardata och statistiska uppgifter
export const analytics = getAnalytics(app); // Exporterar Analytics-instansen om den behövs

export default app; // Exporterar Firebase-appen så att den kan användas i andra delar av applikationen
