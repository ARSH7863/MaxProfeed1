import { createSlice } from "@reduxjs/toolkit";

import { Comment } from "../../TS/models";
import { addComment, getComments, deleteComment } from "./side-effects";

interface CommentsInitialState {
  comments: Comment[];
  loading: boolean;
}

const initialState: CommentsInitialState = {
  comments: [],
  loading: true,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   add comment reducers
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        const parentId = action.payload.parentCommentId;

        if (!parentId) {
          state.comments.unshift(action.payload);
        } else {
          const parentComment = state.comments.find(
            (comment) => comment.id === parentId
          );

          parentComment?.replies.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
      });

    //   get all comment reducers
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
      });

    //   delete comment reducers
    builder
      .addCase(deleteComment.fulfilled, (state, action) => {
        const parentId = action.payload.parentCommentId;
        const deletedCommentId = action.payload.commentId;

        if (!parentId) {
          const deletedCommentIndex = state.comments.findIndex(
            (comment) => comment.id === deletedCommentId
          );
          state.comments.splice(deletedCommentIndex, 1);
        } else {
          const parentComment = state.comments.find(
            (comment) => comment.id === parentId
          );

          const deletedReplyIndex = parentComment?.replies.findIndex(
            (reply) => reply.id === deletedCommentId
          );

          (deletedReplyIndex as number) >= 0 &&
            parentComment?.replies.splice(deletedReplyIndex as number, 1);
        }

        state.loading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

const commentsActions = commentsSlice.actions;

export { commentsActions };
export default commentsSlice.reducer;
