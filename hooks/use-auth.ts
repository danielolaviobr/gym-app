import { auth } from "@/libs/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { proxy } from "valtio";

interface AuthState {
  currentUser: User | Promise<unknown>;
  status: "unknown" | "unauthenticated" | "authenticated";
}

let resolve: (value: unknown) => void;
let initialCurrentUser = new Promise((promiseResolver) => {
  resolve = promiseResolver;
});

let state = proxy<AuthState>({
  currentUser: initialCurrentUser,
  get status() {
    return this.currentUser instanceof Promise
      ? "unknown"
      : this.currentUser === null
      ? "unauthenticated"
      : "authenticated";
  },
});

onAuthStateChanged(auth, (firebaseUser) => {
  resolve(firebaseUser);
  console.log(state.currentUser);
  state.currentUser = {} as User;
  // state.currentUser = firebaseUser;
});

export default function useAuth() {
  return state;
}
