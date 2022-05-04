import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import { AppState } from "../../store";
import { Project } from "../../TS/models";
import { feedbackActions } from "../../store/feedback/feedback-slice";
import Feedback from "../Feedback/Feedback";
import DeleteProjectModal from "./DeleteProjectModal";
import RoadmapTasksCard from "../Roadmap/RoadmapTasksCard";

const allowedFilters = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
const activeBtnClasses = `bg-opacity-100 !text-white`;
const filterBtnClasses =
  "mr-2 mb-3 capitalize btn btn-accent bg-opacity-10 hover:bg-opacity-75 font-medium border-none text-accent hover:text-white";

const ProjectById: React.FunctionComponent<{
  project: Omit<Project, "updatedAt">;
}> = ({ project }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  const handleEditProject = () => {
    router.push({
      pathname: `${router.pathname}/edit`,
      query: { id: project?.id },
    });
  };

  const handleFilterFeedbacks = (filterBy: string) => {
    allowedFilters.includes(filterBy)
      ? setActiveFilter(filterBy)
      : setActiveFilter("All");

    dispatch(feedbackActions.filterFeedbacksBy(filterBy));
  };

  return (
    <div className="mt-12 grid grid-cols-12 gap-5 pb-10">
      <div className="col-span-12 md:col-span-4">
        <div className="card bg-gradient text-white rounded-xl">
          <div className="card-body">
            <div className="flex">
              <p className="opacity-90">Feedback board</p>
              {project.owner === user.uid && (
                <>
                  <div
                    className="tooltip tooltip-secondary mr-3"
                    data-tip="Delete"
                  >
                    <label htmlFor="delete-project-modal">
                      <MdDeleteOutline
                        size={20}
                        className="cursor-pointer modal-button"
                      />
                    </label>
                    <input
                      type="checkbox"
                      id="delete-project-modal"
                      className="modal-toggle"
                    />
                    <DeleteProjectModal
                      labelId="delete-project-modal"
                      id={project.id}
                      name={project.name}
                      imageStorageId={project.imageStorageId}
                    />
                  </div>

                  <div className="tooltip tooltip-secondary" data-tip="Edit">
                    <MdOutlineEdit
                      size={20}
                      className="cursor-pointer"
                      onClick={handleEditProject}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-5">
              <h2 className="card-title line-clamp-2">{project.name}</h2>
              <p className="line-clamp-3 mt-2">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="card bg-white mt-5 rounded-xl">
          <div className="card-body">
            <div className="flex flex-wrap -mb-3">
              {allowedFilters.map((filter, index) => (
                <button
                  key={index}
                  className={`${filterBtnClasses} ${
                    activeFilter === filter && activeBtnClasses
                  }`}
                  onClick={() => handleFilterFeedbacks(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <RoadmapTasksCard />
      </div>

      <div className="col-span-12 md:col-span-8">
        <Feedback projectId={project.id} projectOwner={project.owner} />
      </div>
    </div>
  );
};

export default ProjectById;
