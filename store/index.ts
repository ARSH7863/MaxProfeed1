import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/auth-slice";
import projectsReducer from "./projects/projects-slice";
import feedbackReducer from "./feedback/feedback-slice";
import commentsReducer from "./comments/comments-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    feedback: feedbackReducer,
    comments: commentsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
