import app from "@/libs/firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const auth = getAuth(app);

export async function signInWithGoogle() {
  let provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signIn(email: string, password: string) {
  let user = await signInWithEmailAndPassword(auth, email, password);
}

export async function signup(email: string, password: string, name: string) {
  await createUserWithEmailAndPassword(auth, email, password);
}
