import Link from "next/link";

import { Project } from "../../TS/models";

const ProjectCard: React.FunctionComponent<
  Omit<Project, "owner" | "updatedAt" | "imageStorageId" | "numberOfFeedbacks">
> = ({ id, name, description, image }) => {
  return (
    <Link href={`/projects/${id}`} passHref>
      <div className="mt-10 cursor-pointer">
        <div className="card bg-white shadow-sm rounded-lg">
          <figure>
            <img src={image} alt="Project" />
          </figure>

          <div className="card-body">
            <h5 className="text-xl font-bold truncate mb-1">{name}</h5>
            <p className="line-clamp-7">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
