import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FaComment } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";

import { AppState } from "../../store";
import {
  FeedbackByIdReturn,
  likeFeedback,
  addToRoadmap,
} from "../../store/feedback/side-effects";

import BackBtn from "../UI/BackBtn";
import Comments from "../Comments/Comments";
import AddCommentForm from "../Comments/AddCommentForm";

const allowedTypes = ["Suggestion", "Planned", "In-Progress", "Live"];

const FeedbackById: React.FunctionComponent<{
  feedback: FeedbackByIdReturn;
}> = ({ feedback }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(likeFeedback({ feedbackId: feedback.id, userId: user.uid }));
  };

  const handleAddToRoadmap = (type: string) => {
    dispatch(
      addToRoadmap({
        projectOwner: feedback.projectOwner,
        feedbackId: feedback.id,
        userId: user.uid,
        type,
      })
    );
  };

  return (
    <div className="md:px-28 mt-12">
      <div className="flex items-center justify-between mb-5">
        <BackBtn />

        {user.uid === feedback.author.uid ? (
          <Link
            href={`${router.pathname}/edit`}
            as={`/projects/${feedback.projectId}/feedback/${feedback.id}/edit`}
            passHref
          >
            <button className="btn btn-accent btn-outline">
              Edit feedback
            </button>
          </Link>
        ) : feedback.projectOwner === user.uid ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-accent btn-outline">
              Add to roadmap
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
            >
              {allowedTypes.map((type, index) => (
                <li key={index}>
                  <a
                    className="active:bg-accent"
                    onClick={() => handleAddToRoadmap(type)}
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="card bg-white mb-5">
        <div className="card-body">
          {feedback.projectOwner === feedback.author.uid && (
            <span className="badge badge-primary bg-opacity-10 border-none font-semibold text-primary p-4 rounded-xl mb-2">
              Owner
            </span>
          )}

          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-3">
              <img
                src={feedback.author.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h6 className="font-semibold line-clamp-1">
                  {feedback.author.name}
                </h6>
                <p className="text-xs mt-0.5">
                  {new Date(feedback.updatedAt).toDateString()}
                </p>
              </div>
            </div>

            <button
              className={`w-12 h-14 font-bold text-sm bg-accent bg-opacity-10 rounded-xl truncate ${
                feedback.likedBy.includes(user.uid) &&
                "bg-opacity-80 text-white"
              }`}
              onClick={handleLike}
            >
              <MdKeyboardArrowUp size={18} className="-mb-1 mx-auto" />
              {feedback.likes}
            </button>
          </div>

          <h5 className="font-bold text-lg line-clamp-3">{feedback.title}</h5>
          <p className="text-sm break-words">{feedback.description}</p>

          <div className="flex justify-between items-center">
            <span className="badge badge-accent bg-opacity-10 border-none font-semibold text-accent p-4 rounded-xl mt-3">
              {feedback.category}
            </span>

            <div className="flex gap-2 items-center">
              <FaComment size={18} className="text-accent text-opacity-20" />
              <span className="font-bold text-sm">{feedback.comments}</span>
            </div>
          </div>
        </div>
      </div>

      <AddCommentForm />
      <Comments feedbackId={feedback.id} />
    </div>
  );
};

export default FeedbackById;
