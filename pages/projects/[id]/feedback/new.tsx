import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../../store";
import { getProjectById } from "../../../../store/projects/side-effects";
import Meta from "../../../../components/Misc/Meta";
import Spinner from "../../../../components/UI/Spinner";
import NotFound from "../../../../components/UI/NotFound";
import withPrivateRoute from "../../../../components/Misc/withPrivateRoute";
import AddFeedbackForm from "../../../../components/Feedback/AddFeedbackForm";

const AddFeedback: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: authLoading, user } = useSelector(
    (state: AppState) => state.auth
  );
  const { projectById, loading } = useSelector(
    (state: AppState) => state.projects
  );

  useEffect(() => {
    router.query.id &&
      user.uid &&
      dispatch(getProjectById(router.query.id as string));
  }, [dispatch, router.query.id, user.uid]);

  return (
    <>
      <Meta title="Add feedback" />

      <div className="min-h-screen">
        {authLoading || loading ? (
          <div className="pt-32">
            <Spinner />
          </div>
        ) : user.uid && projectById ? (
          <AddFeedbackForm />
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
};

export default withPrivateRoute(AddFeedback);
