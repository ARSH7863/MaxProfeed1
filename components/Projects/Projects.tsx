import Masonry from "react-masonry-css";
import { Project } from "../../TS/models";

import ProjectCard from "./ProjectCard";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  640: 2,
  500: 1,
};

const Projects: React.FunctionComponent<{ projects: Project[] }> = ({
  projects,
}) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          image={project.image}
        />
      ))}
    </Masonry>
  );
};

export default Projects;
