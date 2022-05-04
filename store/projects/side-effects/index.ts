import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { ProjectFormFields, Project } from "../../../TS/models";
import {
  addProject,
  allProjects,
  userProjects,
  projectById,
  deleteUserProject,
  updateUserProject,
} from "./api";

export type UpdateProjectFields = Omit<ProjectFormFields, "image"> & {
  projectId: string;
  image: string | File;
  imageStorageId: string;
};

export type DeleProjectArgs = { projectId: string; imageStorageId: string };

const createProject = createAsyncThunk<
  void,
  ProjectFormFields & { owner: string }
>("projects/createProject", async ({ name, description, image, owner }) => {
  const response = await addProject({ name, description, image, owner });
  if (response?.error) {
    toast.error(response.error);
    throw new Error(); // reject
  }
  toast.success("Project created successfully");
});

const getAllProjects = createAsyncThunk<Project[]>(
  "projects/getAllProjects",
  async () => {
    const response = await allProjects();
    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }
    return response;
  }
);

const getUsersProjects = createAsyncThunk<Project[], string>(
  "projects/getUsersProjects",
  async (userId) => {
    const response = await userProjects(userId);
    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }
    return response;
  }
);

const getProjectById = createAsyncThunk<Project, string>(
  "projects/getProjectById",
  async (projectId) => {
    const response = await projectById(projectId);
    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }

    return response;
  }
);

const deleteProject = createAsyncThunk<void, DeleProjectArgs>(
  "projects/deleteProject",
  async ({ projectId, imageStorageId }) => {
    const response = await deleteUserProject({ projectId, imageStorageId });
    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    toast.success("Project deleted successfully");
  }
);

const updateProject = createAsyncThunk<{}, UpdateProjectFields>(
  "projects/updateProject",
  async ({ projectId, name, description, image, imageStorageId }) => {
    const response = await updateUserProject({
      projectId,
      name,
      description,
      image,
      imageStorageId,
    });

    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    toast.success("Project updated successfully");
  }
);

export {
  createProject,
  getAllProjects,
  getUsersProjects,
  getProjectById,
  deleteProject,
  updateProject,
};
