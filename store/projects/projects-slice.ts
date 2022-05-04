import { createSlice } from "@reduxjs/toolkit";

import { Project } from "../../TS/models";
import { sortProjects } from "./utils";
import {
  createProject,
  getAllProjects,
  getUsersProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "./side-effects";

interface ProjectsInitialState {
  projects: Project[];
  loading: boolean;
  updating: boolean;
  projectById?: Omit<Project, "updatedAt">;
}

const initialState: ProjectsInitialState = {
  projects: [],
  loading: false,
  updating: false,
  projectById: undefined,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    sortProjectsBy(state, action) {
      sortProjects(action.payload, state.projects);
    },
  },
  extraReducers: (builder) => {
    //   add project reducers
    builder
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.rejected, (state) => {
        state.loading = false;
      });

    //   get all projects reducers
    builder
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.loading = false;
      });

    //   get user's projects reducers
    builder
      .addCase(getUsersProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getUsersProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersProjects.rejected, (state) => {
        state.loading = false;
      });

    //   get project by id reducers
    builder
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.projectById = action.payload;
        state.loading = false;
      })
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectById.rejected, (state) => {
        state.loading = false;
      });

    //   delete project reducers
    builder
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.rejected, (state) => {
        state.loading = false;
      });

    //  update project reducers
    builder
      .addCase(updateProject.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateProject.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateProject.rejected, (state) => {
        state.updating = false;
      });
  },
});

const projectsActions = projectsSlice.actions;

export { projectsActions };
export default projectsSlice.reducer;
