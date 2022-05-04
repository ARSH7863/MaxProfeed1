import isEmail from "validator/lib/isEmail";

const isValidEmail = (email: string) => isEmail(email);

const loginSchema = {
  email: {
    required: { value: true, message: "Email is required" },
  },
  password: {
    required: { value: true, message: "Password is required" },
  },
};

const signupSchema = {
  name: {
    required: { value: true, message: "Name is required" },
    minLength: {
      value: 2,
      message: "Name should be atleast 2 characters long",
    },
    maxLength: {
      value: 50,
      message: "Name cannot be more than 50 characters long",
    },
  },
  email: {
    required: { value: true, message: "Email is required" },
    validate: (value: string) => isValidEmail(value) || "Invalid email address",
  },
  password: {
    required: { value: true, message: "Password is required" },
    minLength: {
      value: 6,
      message: "Password should be atleast 6 characters long",
    },
  },
};

export { loginSchema, signupSchema };
