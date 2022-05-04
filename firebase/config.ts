import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const projectsCollection = collection(firestore, "projects");
const feedbackCollection = collection(firestore, "feedback");
const commentsCollection = collection(firestore, "comments");

export {
  auth,
  firestore,
  storage,
  projectsCollection,
  feedbackCollection,
  commentsCollection,
};
