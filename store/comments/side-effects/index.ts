import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { CommentFormFields, Comment } from "../../../TS/models";
import { createComment, getAllComments, removeComment } from "./api";

export type AddCommentArgs = CommentFormFields & {
  body: string;
  feedbackId: string;
  parentCommentId?: string;
  author: {
    uid: string;
    name: string;
    avatar: string;
  };
};

export interface DeleteCommentArgs {
  commentId: string;
  commentAuthorId: string;
}
export interface DeleteCommentReturn {
  commentId: string;
  parentCommentId?: string;
}

const addComment = createAsyncThunk<Comment, AddCommentArgs>(
  "comments/addComment",
  async ({ body, feedbackId, author, parentCommentId }) => {
    if (!author.uid) {
      toast.error("Login to add a comment");
      throw new Error();
    }

    const response = await createComment({
      body,
      feedbackId,
      author,
      parentCommentId,
    });

    if (response?.error) {
      toast.error(response.error);
      throw new Error(); // reject
    }

    response.parentCommentId
      ? toast.success("Reply added successfully")
      : toast.success("Comment added successfully");
    return response;
  }
);

const getComments = createAsyncThunk<Comment[], string>(
  "comments/getComments",
  async (feedbackId) => {
    const response = await getAllComments(feedbackId);

    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }

    return response;
  }
);

const deleteComment = createAsyncThunk<DeleteCommentReturn, DeleteCommentArgs>(
  "comment/deleteComment",
  async ({ commentId, commentAuthorId }) => {
    const response = await removeComment({ commentId, commentAuthorId });

    if (response?.error) {
      toast.error(response.error);
      throw new Error();
    }

    toast.success("Comment deleted successfully");
    return response;
  }
);

export { addComment, getComments, deleteComment };
