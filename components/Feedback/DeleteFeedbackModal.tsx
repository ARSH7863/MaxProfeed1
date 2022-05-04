import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { deleteFeedback } from "../../store/feedback/side-effects";

interface ModalProps {
  labelId: string;
  title: string;
  feedbackId: string;
  projectId: string;
  feedbackAuthor: string;
}

const DeleteFeedbackModal: React.FunctionComponent<ModalProps> = ({
  labelId,
  title,
  feedbackAuthor,
  feedbackId,
  projectId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDeleteFeedback = async () => {
    await dispatch(deleteFeedback({ feedbackAuthor, feedbackId }));
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="modal text-secondary text-left">
      <div className="modal-box">
        <h3 className="font-bold text-xl line-clamp-1">Delete {title}</h3>
        <p className="py-4 text-lg">
          Are you sure you want to delete your feedback?
        </p>
        <div className="modal-action">
          <label htmlFor={labelId} className="btn btn-accent btn-outline">
            Cancel
          </label>
          <label className="btn btn-error" onClick={handleDeleteFeedback}>
            Yes
          </label>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeedbackModal;
