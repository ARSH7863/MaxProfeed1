const firebaseErrorCodesMsg = {
  "auth/email-already-in-use": "Email address is already in use",
  "auth/invalid-email": "Invalid email address",
  "auth/weak-password": "Password too weak",
  "storage/unauthorized": "Only images of size less than 2MB are allowed",
};

const errorCodesToMsg = (errCode: string) => {
  if (firebaseErrorCodesMsg[errCode as keyof typeof firebaseErrorCodesMsg]) {
    return firebaseErrorCodesMsg[errCode as keyof typeof firebaseErrorCodesMsg];
  }

  return "Something went wrong. Please try again later.";
};

export default errorCodesToMsg;
