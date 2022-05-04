import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { signupSchema } from "./utils/schemas";
import { SignupFormFields } from "../../TS/models";
import { signup } from "../../store/auth/side-effects";
import Input from "../UI/Input";

const SignupForm: React.FunctionComponent<{ avatar: string }> = ({
  avatar,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: AppState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>({ mode: "onTouched" });

  const handleTogglePassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const onSubmit = async (data: SignupFormFields) => {
    dispatch(
      signup({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar,
      })
    );
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="name"
        name="name"
        register={register}
        errors={errors}
        rules={signupSchema.name}
        disabled={loading}
      />
      <Input
        type="text"
        label="email"
        name="email"
        register={register}
        errors={errors}
        rules={signupSchema.email}
        disabled={loading}
      />
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          label="password"
          name="password"
          register={register}
          errors={errors}
          rules={signupSchema.password}
          disabled={loading}
        />
        <button
          type="button"
          disabled={loading}
          className="btn btn-secondary absolute right-0 top-9"
          onClick={handleTogglePassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`btn btn-primary w-full mt-5 ${loading && "loading"}`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
