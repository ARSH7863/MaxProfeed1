import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { userSignup, userLogin, userLogout, userProfile } from "./api";
import { SignupFormFields, LoginFormFields } from "../../../TS/models";

export interface AuthReturn {
  uid: string;
  name: string;
  avatar: string;
}

const signup = createAsyncThunk<
  AuthReturn, // Return type of the payload creator
  SignupFormFields // First argument to the payload creator
>("auth/signup", async ({ name, email, password, avatar }) => {
  const response = await userSignup({ name, email, password, avatar });
  if (response.error) {
    toast.error(response.error);
    throw new Error(); // reject
  }

  toast.success("Account created successfully");
  return response;
});

const login = createAsyncThunk<AuthReturn, LoginFormFields>(
  "auth/login",
  async ({ email, password }) => {
    const response = await userLogin({ email, password });
    if (response.error) {
      toast.error("Invalid credentials");
      throw new Error();
    }
    return response;
  }
);

const logout = createAsyncThunk("auth/logout", async () => {
  const response = await userLogout();
  if (response?.error) {
    toast.error(response.error);
    throw new Error();
  }
});

const getProfile = createAsyncThunk<AuthReturn, string>(
  "auth/profile",
  async (userId) => {
    const response = await userProfile(userId);
    if (response.error) {
      toast.error(response.error);
      throw new Error();
    }
    return response;
  }
);

export { signup, login, logout, getProfile };
