import { Project } from "../../../TS/models";

const projectsSortMap = {
  "newest first": (projects: Project[]) => {
    return projects.sort(
      (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
    );
  },
  "oldest first": (projects: Project[]) => {
    return projects.sort(
      (a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt)
    );
  },
  "most popular": (projects: Project[]) => {
    return projects.sort((a, b) => b.numberOfFeedbacks - a.numberOfFeedbacks);
  },
  "least popular": (projects: Project[]) => {
    return projects.sort((a, b) => a.numberOfFeedbacks - b.numberOfFeedbacks);
  },
};

const defaultSortFunc = (projects: Project[]) => {
  projectsSortMap["newest first"](projects);
};

const sortProjects = (sortBy: string, projects: Project[]) => {
  const sortFunc = projectsSortMap[sortBy as keyof typeof projectsSortMap];
  sortFunc ? sortFunc(projects) : defaultSortFunc(projects);
};

export { sortProjects };
