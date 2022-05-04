import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaComment } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";

import { AppState } from "../../store";
import { Feedback } from "../../TS/models";
import { likeFeedback } from "../../store/feedback/side-effects";

const FeedbackCard: React.FunctionComponent<
  Feedback & { isOwner: boolean; projectId: string }
> = ({
  id,
  title,
  description,
  category,
  updatedAt,
  likes,
  likedBy,
  comments,
  author,
  isOwner,
  projectId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(likeFeedback({ feedbackId: id, userId: user.uid }));
  };

  return (
    <Link
      href={`${router.pathname}/feedback/[feedbackId]`}
      as={`${projectId}/feedback/${id}`}
      passHref
    >
      <div className="card bg-white mb-5 cursor-pointer">
        <div className="card-body">
          {isOwner && (
            <span className="badge badge-primary bg-opacity-10 border-none font-semibold text-primary p-4 rounded-xl mb-2 -mt-2">
              Owner
            </span>
          )}

          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-3">
              <img
                src={author.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h6 className="font-semibold line-clamp-1">{author.name}</h6>
                <p className="text-xs mt-0.5">
                  {new Date(updatedAt).toDateString()}
                </p>
              </div>
            </div>

            <button
              className={`w-12 h-14 font-bold text-sm bg-accent bg-opacity-10 rounded-xl truncate ${
                likedBy.includes(user.uid) && "bg-opacity-80 text-white"
              }`}
              onClick={handleLike}
            >
              <MdKeyboardArrowUp size={18} className="-mb-1 mx-auto" />
              {likes}
            </button>
          </div>

          <h5 className="font-bold text-lg line-clamp-1">{title}</h5>
          <p className="line-clamp-3 text-sm break-words">{description}</p>

          <div className="flex justify-between items-center">
            <span className="badge badge-accent bg-opacity-10 border-none font-semibold text-accent p-4 rounded-xl mt-3">
              {category}
            </span>

            <div className="flex gap-2 items-center">
              <FaComment size={18} className="text-accent text-opacity-20" />
              <span className="font-bold text-sm">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedbackCard;
