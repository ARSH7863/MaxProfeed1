import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../../../../store";
import {
  getFeedbackById,
  FeedbackByIdArgs,
} from "../../../../../store/feedback/side-effects";
import Meta from "../../../../../components/Misc/Meta";
import Spinner from "../../../../../components/UI/Spinner";
import NotFound from "../../../../../components/UI/NotFound";
import Navbar from "../../../../../components/Landing/Navbar";
import FeedbackById from "../../../../../components/Feedback/FeedbackById";

const FeedbackByIdPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
    <div className="container pb-10 min-h-screen">
      <Meta title={feedbackById?.title} />
      <Navbar />

      {loading ? (
        <div className="pt-32">
          <Spinner />
        </div>
      ) : feedbackById ? (
        <FeedbackById feedback={feedbackById} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default FeedbackByIdPage;
