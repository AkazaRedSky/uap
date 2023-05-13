import { getAuth } from "firebase/auth";
import firebase from "./firebaseconfig";

export const auth = getAuth(firebase);