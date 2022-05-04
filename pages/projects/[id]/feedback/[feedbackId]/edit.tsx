import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../../../store";
import {
  getFeedbackById,
  FeedbackByIdArgs,
} from "../../../../../store/feedback/side-effects";
import Meta from "../../../../../components/Misc/Meta";
import Spinner from "../../../../../components/UI/Spinner";
import NotFound from "../../../../../components/UI/NotFound";
import EditFeedbackForm from "../../../../../components/Feedback/EditFeedbackForm";
import withPrivateRoute from "../../../../../components/Misc/withPrivateRoute";

const EditFeedback: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: authLoading, user } = useSelector(
    (state: AppState) => state.auth
  );
  const { feedbackById, loading } = useSelector(
    (state: AppState) => state.feedback
  );

  useEffect(() => {
    router.query.id &&
      router.query.feedbackId &&
      dispatch(
        getFeedbackById({
          projectId: router.query.id,
          feedbackId: router.query.feedbackId,
        } as FeedbackByIdArgs)
      );
  }, [dispatch, router.query.id, router.query.feedbackId]);

  return (
    <>
      <Meta title={`Edit ${feedbackById?.title}`} />

      <div className="min-h-screen pb-5">
        {authLoading || loading ? (
          <div className="pt-32">
            <Spinner />
          </div>
        ) : feedbackById && user.uid === feedbackById.author.uid ? (
          <EditFeedbackForm />
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
};

export default withPrivateRoute(EditFeedback);
