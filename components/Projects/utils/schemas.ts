const projectSchema = {
  name: {
    required: { value: true, message: "Name is required" },
    minLength: {
      value: 3,
      message: "Name should be atleast 3 characters long",
    },
    maxLength: {
      value: 50,
      message: "Name cannot be more than 50 characters long",
    },
  },
  description: {
    required: { value: true, message: "Description is required" },
    maxLength: {
      value: 500,
      message: "Description cannot be more than 500 characters long",
    },
  },
  image: {
    required: { value: true, message: "Image is required" },
  },
};

export { projectSchema };
