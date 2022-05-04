import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaComment } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";

import { AppState } from "../../store";
import { Feedback } from "../../TS/models";
import { likeFeedback } from "../../store/feedback/side-effects";

const taskTypeToColor = {
  Planned: " border-warning",
  "In-Progress": "border-info",
  Live: "border-success",
};

const TaskCard: React.FunctionComponent<
  Omit<Feedback, "updatedAt" | "author" | "projectId">
> = ({ id, title, description, category, type, likes, comments, likedBy }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(likeFeedback({ feedbackId: id, userId: user.uid }));
  };

  return (
    <Link href={`/projects/${router.query.id}/feedback/${id}`} passHref>
      <div
        className={`card bg-white my-5 cursor-pointer rounded-xl border-t-4 ${
          taskTypeToColor[type as keyof typeof taskTypeToColor]
        }`}
      >
        <div className="card-body">
          <h5 className="font-bold line-clamp-2">{title}</h5>
          <p className="line-clamp-5 text-sm break-words mt-1">{description}</p>

          <span className="badge badge-accent bg-opacity-10 border-none font-semibold text-accent p-4 rounded-xl mt-6">
            {category}
          </span>

          <div className="mt-3 flex justify-between items-center">
            <button
              className={`w-16 py-2 flex justify-center font-bold text-sm bg-accent bg-opacity-10 rounded-xl truncate ${
                likedBy.includes(user.uid) && "bg-opacity-80 text-white"
              }`}
              onClick={handleLike}
            >
              <MdKeyboardArrowUp size={18} className="mr-1" /> {likes}
            </button>

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

export default TaskCard;
