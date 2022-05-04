import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { AppState } from "../../store";
import { getAllProjects } from "../../store/projects/side-effects";
import { projectsActions } from "../../store/projects/projects-slice";
import Spinner from "../UI/Spinner";
import Projects from "../Projects/Projects";

function ProjectsSection() {
  const [sortBy, setSortBy] = useState("newest first");
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(
    (state: AppState) => state.projects
  );

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    dispatch(projectsActions.sortProjectsBy(newSortBy));
  };

  return (
    <div className="mt-28 pb-16">
      <div className="p-7 bg-secondary rounded-lg sm:flex items-center justify-between">
        <h1 className="text-2xl text-white font-medium">Projects</h1>

        <div className="dropdown mt-4 sm:mt-0">
          <label tabIndex={0} className="capitalize btn btn-primary w-52">
            Sort by: {sortBy}
            <MdOutlineKeyboardArrowDown className="ml-1" size={20} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
          >
            <li>
              <a onClick={() => handleSortByChange("most popular")}>
                Most popular
              </a>
            </li>
            <li>
              <a onClick={() => handleSortByChange("least popular")}>
                Least popular
              </a>
            </li>
            <li>
              <a onClick={() => handleSortByChange("newest first")}>
                Newest first
              </a>
            </li>
            <li>
              <a onClick={() => handleSortByChange("oldest first")}>
                Oldest first
              </a>
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <div className="mt-20">
          <Spinner />
        </div>
      ) : !!projects.length ? (
        <Projects projects={projects} />
      ) : (
        <div className="flex flex-col items-center mt-10">
          <img src="/images/empty.svg" alt="Empty page" />
          <p className="text-center mt-5">We could not find any projects</p>
        </div>
      )}
    </div>
  );
}

export default ProjectsSection;
