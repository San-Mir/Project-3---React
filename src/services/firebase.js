import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithRedirect,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

const BASE_COLLECTION_NAME = "chat-rooms";
const DEFAULT_ROOM_ID = "default";
const MESSAGES_COLLECTION_PATH = "messages";

const firebaseConfig = {
  apiKey: "AIzaSyCKd33GJQgp0qAz4s04zoF68Q5fI-NTjM4",
  authDomain: "hassan-proj.firebaseapp.com",
  projectId: "hassan-proj",
  storageBucket: "hassan-proj.appspot.com",
  messagingSenderId: "811599235716",
  appId: "1:811599235716:web:3bb95fd6925d5e5eb510d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithRedirect(auth, provider);
    return [user, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const sendMessage = async (user, text, roomId = DEFAULT_ROOM_ID) => {
  try {
    await addDoc(
      collection(db, BASE_COLLECTION_NAME, roomId, MESSAGES_COLLECTION_PATH),
      {
        user: {
          id: user.uid,
          uid: user.uid,
          name: user.displayName,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
          isAnonymous: user.isAnonymous,
          phoneNumber: user.phoneNumber,
        },
        text: text.trim(),
        timestamp: serverTimestamp(),
        clientId: uuid(),
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getMessages = (callback, roomId = DEFAULT_ROOM_ID) => {
  return onSnapshot(
    query(
      collection(db, BASE_COLLECTION_NAME, roomId, MESSAGES_COLLECTION_PATH),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
};

const firebase = {
  auth,
  loginWithGoogle,
  getMessages,
  sendMessage,
};

export default firebase;
