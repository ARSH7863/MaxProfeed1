import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { commentsSchema } from "./utils/schema";
import { CommentFormFields } from "../../TS/models";
import { addComment } from "../../store/comments/side-effects";
import Textarea from "../UI/Textarea";

interface ReplyFormProps {
  handleToggleReplyForm: () => void;
  parentCommentId: string;
}

const AddReplyForm: React.FunctionComponent<ReplyFormProps> = ({
  handleToggleReplyForm,
  parentCommentId,
}) => {
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
        parentCommentId,
        body: data.body,
        author: user,
      })
    );

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <Textarea
        label="body"
        name="body"
        showLabel={false}
        register={register}
        errors={user.uid ? errors : {}}
        disabled={!user.uid || loading}
        rules={commentsSchema.body}
      />

      <button
        type="submit"
        className="btn btn-primary mt-5 capitalize"
        disabled={!user.uid || loading}
      >
        Post reply
      </button>

      <button
        type="button"
        className="btn btn-secondary mt-5 ml-3 capitalize"
        disabled={!user.uid || loading}
        onClick={handleToggleReplyForm}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddReplyForm;
