import useAuthStateChanged from "../../hooks/useAuthStateChanged";

function AuthListener() {
  useAuthStateChanged();
  return null;
}

export default AuthListener;
