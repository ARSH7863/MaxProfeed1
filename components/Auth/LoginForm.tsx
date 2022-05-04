import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { loginSchema } from "./utils/schemas";
import { LoginFormFields } from "../../TS/models";
import { login } from "../../store/auth/side-effects";
import Input from "../UI/Input";

function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: AppState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({ mode: "onTouched" });

  const handleTogglePassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const onSubmit = (data: LoginFormFields) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="email"
        name="email"
        register={register}
        errors={errors}
        rules={loginSchema.email}
        disabled={loading}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          label="password"
          name="password"
          register={register}
          errors={errors}
          rules={loginSchema.password}
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
        Login
      </button>
    </form>
  );
}

export default LoginForm;
