import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";

import { AppState, AppDispatch } from "../../store";
import { projectSchema } from "./utils/schemas";
import { ProjectFormFields } from "../../TS/models";
import { updateProject } from "../../store/projects/side-effects";
import Input from "../UI/Input";
import BackBtn from "../UI/BackBtn";
import Textarea from "../UI/Textarea";
import CardContainer from "../UI/CardContainer";

function EditProjectForm() {
  const [image, setImage] = useState<File>();

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { projectById, updating } = useSelector(
    (state: AppState) => state.projects
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormFields>({ mode: "onTouched" });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0]);
  };

  const onSubmit = async (data: ProjectFormFields) => {
    if (
      data.name === projectById?.name &&
      data.description === projectById.description &&
      typeof image === "undefined"
    ) {
      return;
    }

    try {
      const resultAction = await dispatch(
        updateProject({
          projectId: projectById!.id,
          image: image ?? projectById!.image,
          imageStorageId: projectById!.imageStorageId,
          name: data.name,
          description: data.description,
        })
      );

      unwrapResult(resultAction);
      router.push("/projects");
    } catch (err) {}
  };

  return (
    <>
      <div className="container mt-10 sm:mt-0 sm:pt-10">
        <div className="absolute top-10 z-20 sm:static sm:pl-10 md:pl-24 lg:pl-48">
          <BackBtn disabled={updating} />
        </div>
      </div>

      <div className="sm:mt-7 xl:mt-0">
        <CardContainer>
          <div className="bg-gradient w-10 h-10 rounded-full hidden sm:flex items-center justify-center  absolute -top-5">
            <MdEdit className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-semibold mb-5">Edit Project</h1>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="name"
              name="name"
              defaultValue={projectById?.name}
              register={register}
              errors={errors}
              rules={projectSchema.name}
              disabled={updating}
            />

            <Textarea
              label="description"
              name="description"
              defaultValue={projectById?.description}
              register={register}
              errors={errors}
              rules={projectSchema.description}
              disabled={updating}
            />

            <div className="form-control mb-3">
              <label className="label font-medium">
                <span className="label-text capitalize">Image</span>
              </label>
              <label
                className={`input w-full ${
                  updating ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  disabled={updating}
                />
                <p className="mt-2">{image ? image.name : "No File Chosen"}</p>
              </label>
              <label className="label">
                <span className="label-text-alt">
                  Image size should be less than 2MB
                </span>
              </label>

              <a
                href={projectById?.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-link p-0 self-start hover:no-underline"
              >
                See image
              </a>
            </div>

            <button
              type="submit"
              disabled={updating}
              className={`btn btn-primary w-full mt-5 ${updating && "loading"}`}
            >
              Update
            </button>
          </form>
        </CardContainer>
      </div>
    </>
  );
}

export default EditProjectForm;
