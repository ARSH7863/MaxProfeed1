import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

import { AppState } from "../../store";
import { feedbackActions } from "../../store/feedback/feedback-slice";
import { getFeedbacks } from "../../store/feedback/side-effects";
import FeedbackCard from "./FeedbackCard";
import Spinner from "../UI/Spinner";

const allowedSortBys = [
  "newest first",
  "oldest first",
  "least upvotes",
  "most upvotes",
];

const Feedback: React.FunctionComponent<{
  projectId: string;
  projectOwner: string;
}> = ({ projectId, projectOwner }) => {
  const [sortBy, setSortBy] = useState("newest first");

  const router = useRouter();
  const dispatch = useDispatch();
  const { feedbacks, filteredFeedbacks, loading } = useSelector(
    (state: AppState) => state.feedback
  );

  useEffect(() => {
    dispatch(getFeedbacks(projectId));
  }, [dispatch, projectId]);

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    dispatch(feedbackActions.sortFeedbacksBy(newSortBy));
  };

  return (
    <>
      <div className="py-4 px-6 bg-secondary rounded-xl sm:flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/suggestions-icon.svg" alt="bulb-icon" />
          <h2 className="text-lg text-white font-semibold ml-2">
            {feedbacks.length} Suggestion(s)
          </h2>
        </div>

        <Link
          href={`${router.pathname}/feedback/new`}
          as={`${projectId}/feedback/new`}
          passHref
        >
          <button className="btn btn-primary btn-sm text-xs sm:btn-md mt-5 sm:mt-0">
            <FaPlus className="mr-1" size={11} /> Add Feedback
          </button>
        </Link>
      </div>

      <div className="dropdown dropdown-end mt-4">
        <label
          tabIndex={0}
          className="capitalize btn btn-link hover:no-underline no-animation btn-primary w-52"
        >
          Sort by: {sortBy}
          <MdOutlineKeyboardArrowDown className="ml-1" size={20} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content -mt-2 menu p-2 shadow bg-white rounded-box w-52"
        >
          {allowedSortBys.map((sortBy, index) => (
            <li key={index}>
              <a
                onClick={() => handleSortByChange(sortBy)}
                className="capitalize"
              >
                {sortBy}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <Spinner />
      ) : !!filteredFeedbacks.length ? (
        filteredFeedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            id={feedback.id}
            title={feedback.title}
            description={feedback.description}
            updatedAt={feedback.updatedAt}
            category={feedback.category}
            likes={feedback.likes}
            likedBy={feedback.likedBy}
            comments={feedback.comments}
            author={feedback.author}
            isOwner={feedback.author.uid === projectOwner}
            projectId={projectId}
          />
        ))
      ) : (
        <div className="flex flex-col items-center pt-14">
          <img src="/images/empty.svg" alt="Empty page" />
          <p className="text-center mt-5">
            {!feedbacks.length
              ? "No suggestions for this project"
              : "No results for that filter"}
          </p>

          {!feedbacks.length ? (
            <p className="text-center">
              Be the first to{" "}
              <span className="text-primary">
                <Link
                  href={`${router.pathname}/feedback/new`}
                  as={`${projectId}/feedback/new`}
                >
                  add
                </Link>
              </span>{" "}
              one
            </p>
          ) : (
            <p className="text-center">Try a different one</p>
          )}
        </div>
      )}
    </>
  );
};

export default Feedback;
