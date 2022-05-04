import { useRouter } from "next/router";
import { NextComponentType } from "next";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";

function withPrivateRoute<T>(Component: NextComponentType<T>) {
  return function WrappedComponent(props: T) {
    const authLoading = useAuthStateChanged();
    const { isAuthed } = useSelector((state: AppState) => state.auth);
    const router = useRouter();

    if (typeof window !== "undefined") {
      if (authLoading) return null;

      if (!authLoading && !isAuthed) {
        router.replace("/auth?tab=login");
        return null;
      }

      return <Component {...props} />;
    }

    return null;
  };
}

export default withPrivateRoute;
