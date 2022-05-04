import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { Feedback, FeedbackFormFields } from "../../../TS/models";
import {
  createFeedback,
  getFeedbacksForProject,
  feedbackById,
  deleteProjectFeedback,
  updateProjectFeedback,
  likeFeedbackById,
  addFeedbackToRoadmap,
} from "./api";

export type AddFeedbackFields = FeedbackFormFields & {
  projectId: string;
  author: {
    uid: string;
    name: string;
    avatar: string;
  };
};
export type UpdateFeedbackFields = FeedbackFormFields & {
  projectId: string;
  feedbackId: string;
  authorId: string;
};

export type FeedbackByIdArgs = { projectId: string; feedbackId: string };
export type FeedbackByIdReturn = Feedback & { projectOwner: string };

export type DeleteFeedbackArgs = { feedbackAuthor: string; feedbackId: string };
export type LikeFeedbackArgs = { feedbackId: string; userId: string };
export type LikeFeedbackReturn = {
  feedbackId: string;
  userId: string;
  likes: number;
  likedBy: string[];
};
export type AddToRoadmapArgs = {
  projectOwner: string;
  feedbackId: string;
  userId: string;
  type: string;
};

const addFeedback = createAsyncThunk<void, AddFeedbackFields>(
  "feedback/addFeedback",
  async ({ title, description, category, type, projectId, author }) => {
    const response = await createFeedback({
      title,
      description,
      category,
      type,
      projectId,
      author,
    });

    if (response?.error) {
      toast.error(response.error);
      throw new Error(); // reject
    }
    toast.success("Feedback added successfully");
  }
);

const getFeedbacks = createAsyncThunk<Feedback[], string>(
  "feedback/getFeedbacks",
  async (projectId) => {
    const response = await getFeedbacksForProject(projectId);
    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }
    return response;
  }
);

const getFeedbackById = createAsyncThunk<FeedbackByIdReturn, FeedbackByIdArgs>(
  "feedback/getFeedbackById",
  async ({ projectId, feedbackId }) => {
    const response = await feedbackById({ projectId, feedbackId });
    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }

    return response;
  }
);

const deleteFeedback = createAsyncThunk<void, DeleteFeedbackArgs>(
  "feedback/deleteFeedback",
  async ({ feedbackAuthor, feedbackId }) => {
    const response = await deleteProjectFeedback({
      feedbackAuthor,
      feedbackId,
    });

    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    toast.success("Feedback deleted successfully");
  }
);

const updateFeedback = createAsyncThunk<void, UpdateFeedbackFields>(
  "projects/updateProject",
  async ({
    projectId,
    feedbackId,
    title,
    description,
    category,
    type,
    authorId,
  }) => {
    const response = await updateProjectFeedback({
      projectId,
      feedbackId,
      title,
      description,
      category,
      type,
      authorId,
    });

    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    toast.success("Feedback updated successfully");
  }
);

const likeFeedback = createAsyncThunk<LikeFeedbackReturn, LikeFeedbackArgs>(
  "feedback/likeFeedback",
  async ({ feedbackId, userId }) => {
    if (!userId) {
      toast.error("Login to upvote a feedback");
      throw new Error();
    }

    const response = await likeFeedbackById({ feedbackId, userId });
    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    return response;
  }
);

const addToRoadmap = createAsyncThunk<void, AddToRoadmapArgs>(
  "feedback/addToRoadmap",
  async ({ projectOwner, feedbackId, userId, type }) => {
    const response = await addFeedbackToRoadmap({
      projectOwner,
      feedbackId,
      userId,
      type,
    });

    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    type === "Suggestion"
      ? toast.success("Feedback removed from roadmap")
      : toast.success(`Feedback added to roadmap: ${type}`);
  }
);

export {
  addFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback,
  updateFeedback,
  likeFeedback,
  addToRoadmap,
};
