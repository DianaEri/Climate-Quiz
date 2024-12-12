// Importing functions from the SDKs we need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import authentication
import { getAnalytics } from 'firebase/analytics';

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3TT0zMdvSJrFqAqdZUUSjf_GFRJfozcg',
  authDomain: 'climate-quiz-b2393.firebaseapp.com',
  projectId: 'climate-quiz-b2393',
  storageBucket: 'climate-quiz-b2393.firebasestorage.app',
  messagingSenderId: '622521437292',
  appId: '1:622521437292:web:b809eb53da323b3bdedc49',
  measurementId: 'G-1D2PHPGT6T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Initialize Analytics

// Initialize Authentication
export const auth = getAuth(app); // Export the auth object

export default app;
