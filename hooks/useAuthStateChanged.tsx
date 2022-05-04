import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getProfile } from "../store/auth/side-effects";
import { authActions } from "../store/auth/auth-slice";
import { auth } from "../firebase/config";

function useAuthStateChanged() {
  const dispatch = useDispatch();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(authActions.updateIsAuthed(true));
        dispatch(getProfile(authUser.uid));
        setAuthLoading(false);
        return;
      }
      dispatch(authActions.updateIsAuthed(false));
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return authLoading;
}

export default useAuthStateChanged;
