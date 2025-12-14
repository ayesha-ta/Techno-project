import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFiSPSkk0Zl9cjsWocAihOLxgvFZrLe78",
  authDomain: "careerai-agent.firebaseapp.com",
  projectId: "careerai-agent",
  storageBucket: "careerai-agent.firebasestorage.app",
  messagingSenderId: "87835977086",
  appId: "1:87835977086:web:6feae640099bff018bff2f",
  measurementId: "G-V4H7KG1W4J",
  databaseURL: "https://careerai-agent-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
// Note: Sometimes the databaseURL might be slightly different. 
// If it fails, I'll ask user to check their config object. 
// For now, I will use the standard pattern `https://<PROJECT-ID>-default-rtdb.firebaseio.com`.

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, analytics, auth, db };
