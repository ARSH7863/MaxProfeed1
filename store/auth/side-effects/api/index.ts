import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore/lite";

import { auth, firestore } from "../../../../firebase/config";
import { SignupFormFields, LoginFormFields } from "../../../../TS/models";
import asyncHandler from "../../../../utils/asyncHandler";

const userSignup = asyncHandler<SignupFormFields>(
  async ({ name, email, password, avatar }) => {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const newUserDocRef = doc(firestore, "users", newUser.user.uid);
    await setDoc(newUserDocRef, { name, avatar });
    return { uid: newUser.user.uid, name, avatar };
  }
);

const userLogin = asyncHandler<LoginFormFields>(async ({ email, password }) => {
  const authUser = await signInWithEmailAndPassword(auth, email, password);
  const userDocRef = doc(firestore, "users", authUser.user.uid);
  const userDoc = await getDoc(userDocRef);

  let name, avatar;
  if (userDoc.exists()) {
    name = userDoc.data().name;
    avatar = userDoc.data().avatar;
  }
  return { uid: authUser.user.uid, name, avatar };
});

const userLogout = asyncHandler<void>(async () => {
  await signOut(auth);
});

const userProfile = asyncHandler<string>(async (userId) => {
  const userDocRef = doc(firestore, "users", userId);
  const userDoc = await getDoc(userDocRef);

  let name, avatar;
  if (userDoc.exists()) {
    name = userDoc.data().name;
    avatar = userDoc.data().avatar;
  }
  return { uid: userId, name, avatar };
});

export { userSignup, userLogin, userLogout, userProfile };
