import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { deleteProject } from "../../store/projects/side-effects";

interface ModalProps {
  labelId: string;
  name: string;
  id: string;
  imageStorageId: string;
}

const DeleteProjectModal: React.FunctionComponent<ModalProps> = ({
  labelId,
  name,
  id,
  imageStorageId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDeleteProject = async () => {
    await dispatch(deleteProject({ projectId: id, imageStorageId }));
    router.push("/projects");
  };

  return (
    <div className="modal text-secondary text-left">
      <div className="modal-box">
        <h3 className="font-bold text-xl line-clamp-1">Delete {name}</h3>
        <p className="py-4 text-lg">
          Are you sure you want to delete this project?
        </p>
        <div className="modal-action">
          <label htmlFor={labelId} className="btn btn-accent btn-outline">
            Cancel
          </label>
          <label className="btn btn-error" onClick={handleDeleteProject}>
            Yes
          </label>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
