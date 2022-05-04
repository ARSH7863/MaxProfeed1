const commentsSchema = {
  body: {
    required: { value: true, message: "Comment body is required" },
    maxLength: {
      value: 250,
      message: "Comments cannot be more than 250 characters long",
    },
  },
};

export { commentsSchema };
