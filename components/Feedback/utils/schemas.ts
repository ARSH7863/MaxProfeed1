const allowedCategories = ["UI", "UX", "Feature", "Bug", "Enhancement"];
const allowedTypes = ["", "Suggestion", "Planned", "In-Progress", "Live"];

const feedbackSchema = {
  title: {
    required: { value: true, message: "Title is required" },
    minLength: {
      value: 10,
      message: "Title should be atleast 10 characters long",
    },
    maxLength: {
      value: 100,
      message: "Title cannot be more than 100 characters long",
    },
  },
  category: {
    required: { value: true, message: "Category is required" },
    validate: (value: string) =>
      allowedCategories.includes(value) || "Invalid category",
  },
  type: {
    validate: (value: any) =>
      allowedTypes.includes(value) || "Invalid feedback type",
  },
  description: {
    required: { value: true, message: "Description is required" },
    maxLength: {
      value: 1000,
      message: "Description cannot be more than 1000 characters long",
    },
  },
};

export { feedbackSchema };
