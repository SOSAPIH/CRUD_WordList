import { initializeApp } from "firebase/app";
/* 앱 초기화를 위한 import */
import { getFirestore } from "firebase/firestore";
/* 데이터베이스(firestore) 사용을 위한 import */


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




// apiKey: "AIzaSyBEthKIOeOHT26Od_X8VsJYFHl-drGvJYk",
//   authDomain: "wordlist-a1441.firebaseapp.com",
//   databaseURL: "https://wordlist-a1441-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "wordlist-a1441",
//   storageBucket: "wordlist-a1441.appspot.com",
//   messagingSenderId: "1014340474102",
//   appId: "1:1014340474102:web:2ea705032149ae0f5dc8d7"