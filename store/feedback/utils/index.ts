import { Feedback } from "../../../TS/models";

const feedbacksSortMap = {
  "newest first": (feedbacks: Feedback[]) => {
    return feedbacks.sort(
      (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
    );
  },
  "oldest first": (feedbacks: Feedback[]) => {
    return feedbacks.sort(
      (a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt)
    );
  },
  "most upvotes": (feedbacks: Feedback[]) => {
    return feedbacks.sort((a, b) => b.likes - a.likes);
  },
  "least upvotes": (feedbacks: Feedback[]) => {
    return feedbacks.sort((a, b) => a.likes - b.likes);
  },
};

const feedbacksFilterMap = {
  UI: (feedbacks: Feedback[]) => {
    return feedbacks.filter((feedback) => feedback.category === "UI");
  },
};

const defaultSortFunc = (feedbacks: Feedback[]) => {
  feedbacksSortMap["newest first"](feedbacks);
};

const sortFeedbacks = (sortBy: string, feedbacks: Feedback[]) => {
  const sortFunc = feedbacksSortMap[sortBy as keyof typeof feedbacksSortMap];
  sortFunc ? sortFunc(feedbacks) : defaultSortFunc(feedbacks);
};

const allowedFilters = ["UI", "UX", "Feature", "Bug", "Enhancement"];
const filterFeedbacks = (filterBy: string, feedbacks: Feedback[]) => {
  if (allowedFilters.includes(filterBy)) {
    return feedbacks.filter((feedback) => feedback.category === filterBy);
  }

  return feedbacks;
};

export { sortFeedbacks, filterFeedbacks };
