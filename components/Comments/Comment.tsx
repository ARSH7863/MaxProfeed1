import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

import { AppState } from "../../store";
import { Comment } from "../../TS/models";
import { deleteComment } from "../../store/comments/side-effects";
import AddReplyForm from "./AddReplyForm";
import styles from "./Comments.module.css";

const Comment: React.FunctionComponent<
  Omit<Comment, "parentCommentId"> & { isReply?: boolean }
> = ({ id, author, body, updatedAt, replies, isReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  const handleDelete = () => {
    dispatch(deleteComment({ commentId: id, commentAuthorId: author.uid }));
  };

  const handleToggleReplyForm = () => {
    setShowReplyForm((prevValue) => !prevValue);
  };

  return (
    <div className={`mb-10 ${!isReply && styles.comment}`}>
      <div className="mb-7">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src={author.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h6 className="font-semibold line-clamp-1">{author.name}</h6>
              <p className="text-xs mt-0.5">
                {updatedAt && new Date(updatedAt).toDateString()}
              </p>
            </div>
          </div>

          {author.uid === user.uid && (
            <div className="tooltip" data-tip="Delete">
              <MdDeleteOutline
                size={20}
                className="text-error cursor-pointer"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>

        <p className="break-words mt-4 text-sm">{body}</p>

        {user.uid && !showReplyForm && !isReply && (
          <button
            className="text-primary text-sm btn-link font-medium hover:no-underline mt-4"
            onClick={handleToggleReplyForm}
          >
            Reply
          </button>
        )}

        {user.uid && showReplyForm && !isReply && (
          <AddReplyForm
            handleToggleReplyForm={handleToggleReplyForm}
            parentCommentId={id}
          />
        )}
      </div>

      {replies &&
        replies.map((reply) => (
          <div key={reply.id} className={`pl-7 ${styles.reply}`}>
            <Comment
              id={reply.id}
              body={reply.body}
              author={reply.author}
              updatedAt={reply.updatedAt}
              replies={reply.replies}
              isReply={true}
            />
          </div>
        ))}
    </div>
  );
};

export default Comment;
