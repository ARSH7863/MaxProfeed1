import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { getComments } from "../../store/comments/side-effects";
import Spinner from "../UI/Spinner";
import Comment from "./Comment";

const Comments: React.FunctionComponent<{ feedbackId: string }> = ({
  feedbackId,
}) => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector(
    (state: AppState) => state.comments
  );

  useEffect(() => {
    dispatch(getComments(feedbackId));
  }, [dispatch, feedbackId]);

  return (
    <div className="p-7 bg-white rounded-lg">
      {loading ? (
        <>
          <Spinner />
          <h3 className="text-center mt-5">Comments are on their way...</h3>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-10">
            {comments.length} Comment(s)
          </h1>

          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              body={comment.body}
              author={comment.author}
              updatedAt={comment.updatedAt}
              replies={comment.replies}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
