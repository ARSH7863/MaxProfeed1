import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { AppState } from "../../store";
import { commentsSchema } from "./utils/schema";
import { CommentFormFields } from "../../TS/models";
import { addComment } from "../../store/comments/side-effects";
import Textarea from "../UI/Textarea";

function AddCommentForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: AppState) => state.comments);
  const { feedbackById } = useSelector((state: AppState) => state.feedback);
  const { user } = useSelector((state: AppState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormFields>({ mode: "onTouched" });

  const onSubmit = async (data: CommentFormFields) => {
    await dispatch(
      addComment({
        feedbackId: feedbackById!.id,
        body: data.body,
        author: user,
      })
    );

    reset();
  };

  return (
    <div className="card bg-white mb-5">
      <div className="card-body">
        <h3 className="text-xl font-bold">Add a comment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            label="body"
            name="body"
            showLabel={false}
            register={register}
            errors={user.uid ? errors : {}}
            disabled={!user.uid || loading}
            rules={commentsSchema.body}
          />

          <div className="mt-6 flex items-center sm:items-end justify-between">
            <button
              type="submit"
              className="btn btn-primary capitalize "
              disabled={!user.uid || loading}
            >
              Post comment
            </button>

            {!user.uid && (
              <div className="text-sm ml-2">
                <Link href="/auth?tab=login" passHref>
                  <button className="text-primary btn-link">Login</button>
                </Link>
                <span> to add a comment</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCommentForm;
