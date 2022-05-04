import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

import { AppState, AppDispatch } from "../../store";
import { projectSchema } from "./utils/schemas";
import { ProjectFormFields } from "../../TS/models";
import { createProject } from "../../store/projects/side-effects";
import Input from "../UI/Input";
import BackBtn from "../UI/BackBtn";
import Textarea from "../UI/Textarea";
import CardContainer from "../UI/CardContainer";

function AddProjectForm() {
  const [image, setImage] = useState("");

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);
  const { loading } = useSelector((state: AppState) => state.projects);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormFields & { image: FileList }>({ mode: "onTouched" });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0].name);
      if (errors.image) {
        errors.image = undefined;
      }
      return;
    }
    setImage("");
  };

  const onSubmit = async (data: ProjectFormFields & { image: FileList }) => {
    try {
      const resultAction = await dispatch(
        createProject({
          name: data.name,
          description: data.description,
          image: data.image[0],
          owner: user.uid,
        })
      );
      unwrapResult(resultAction);

      router.push("/projects");
    } catch (err) {}
  };

  const imageRegister = register("image", projectSchema.image);

  return (
    <>
      <div className="container mt-10 sm:mt-0 sm:pt-10 ">
        <div className="absolute top-10 z-20 sm:static sm:pl-10 md:pl-24 lg:pl-48">
          <BackBtn disabled={loading} />
        </div>
      </div>

      <div className="sm:mt-7 xl:mt-0">
        <CardContainer>
          <div className="bg-gradient w-10 h-10 rounded-full hidden sm:flex items-center justify-center  absolute -top-5">
            <FaPlus className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-semibold mb-5">New Project</h1>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="name"
              name="name"
              register={register}
              errors={errors}
              rules={projectSchema.name}
              disabled={loading}
            />

            <Textarea
              label="description"
              name="description"
              register={register}
              errors={errors}
              rules={projectSchema.description}
              disabled={loading}
            />

            <div className="form-control mb-3">
              <label className="label font-medium">
                <span className="label-text capitalize">Image</span>
              </label>
              <label
                className={`input w-full ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...imageRegister}
                  onChange={(e) => {
                    imageRegister.onChange(e);
                    handleImageChange(e);
                  }}
                  disabled={loading}
                />
                <p className="mt-2">{image ? image : "No File Chosen"}</p>
              </label>
              <label className="label">
                <span className="label-text-alt">
                  Image size should be less than 2MB
                </span>
              </label>

              {errors.image && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.image.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full mt-5 ${loading && "loading"}`}
            >
              Create
            </button>
          </form>
        </CardContainer>
      </div>
    </>
  );
}

export default AddProjectForm;
