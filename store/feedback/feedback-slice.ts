import { createSlice } from "@reduxjs/toolkit";

import { Feedback } from "../../TS/models";
import { sortFeedbacks, filterFeedbacks } from "./utils";
import {
  addFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback,
  updateFeedback,
  likeFeedback,
  FeedbackByIdReturn,
} from "./side-effects";

import { addComment, deleteComment } from "../comments/side-effects";

interface FeedbackInitialState {
  feedbacks: Feedback[];
  filteredFeedbacks: Feedback[];
  loading: boolean;
  updating: boolean;
  feedbackById?: FeedbackByIdReturn;
}

const initialState: FeedbackInitialState = {
  loading: true,
  updating: false,
  feedbacks: [],
  filteredFeedbacks: [],
  feedbackById: undefined,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    sortFeedbacksBy(state, action) {
      sortFeedbacks(action.payload, state.filteredFeedbacks);
    },
    filterFeedbacksBy(state, action) {
      state.filteredFeedbacks = filterFeedbacks(
        action.payload,
        state.feedbacks
      );
    },
  },
  extraReducers: (builder) => {
    //  add feedback reducers
    builder
      .addCase(addFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeedback.rejected, (state) => {
        state.loading = false;
      });

    //  get project's feedback reducers
    builder
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.filteredFeedbacks = action.payload;
        state.loading = false;
      })
      .addCase(getFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedbacks.rejected, (state) => {
        state.loading = false;
      });

    //  get feedback by id reducers
    builder
      .addCase(getFeedbackById.fulfilled, (state, action) => {
        state.feedbackById = action.payload;
        state.loading = false;
      })
      .addCase(getFeedbackById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedbackById.rejected, (state) => {
        state.loading = false;
      });

    //  delete feedback reducers
    builder
      .addCase(deleteFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFeedback.rejected, (state) => {
        state.loading = false;
      });

    //  update feedback reducers
    builder
      .addCase(updateFeedback.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateFeedback.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateFeedback.rejected, (state) => {
        state.updating = false;
      });

    //  like feedback reducers
    builder.addCase(likeFeedback.fulfilled, (state, action) => {
      const likedFeedback = state.filteredFeedbacks.find(
        (feedback) => feedback.id === action.payload.feedbackId
      );

      if (likedFeedback) {
        likedFeedback.likes = action.payload.likes;
        likedFeedback.likedBy = action.payload.likedBy;
      }

      if (state.feedbackById) {
        state.feedbackById.likedBy = action.payload.likedBy;
        state.feedbackById.likes = action.payload.likes;
      }
    });

    //  increase number of comments on feedback when a comment is added
    builder.addCase(addComment.fulfilled, (state, action) => {
      !action.payload.parentCommentId &&
        state.feedbackById &&
        state.feedbackById.comments++;
    });

    //  decrease number of comments on feedback when a comment is deleted
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      !action.payload.parentCommentId &&
        state.feedbackById &&
        state.feedbackById.comments--;
    });
  },
});

const feedbackActions = feedbackSlice.actions;

export { feedbackActions };
export default feedbackSlice.reducer;
