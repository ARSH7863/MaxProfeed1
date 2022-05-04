import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

import { AppState } from "../../store";
import { feedbackSchema } from "./utils/schemas";
import { FeedbackFormFields } from "../../TS/models";
import { addFeedback } from "../../store/feedback/side-effects";
import Input from "../UI/Input";
import BackBtn from "../UI/BackBtn";
import Textarea from "../UI/Textarea";
import CardContainer from "../UI/CardContainer";

function AddFeedbackForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);
  const { projectById } = useSelector((state: AppState) => state.projects);
  const { loading } = useSelector((state: AppState) => state.feedback);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormFields>({ mode: "onTouched" });

  const onSubmit = async (data: FeedbackFormFields) => {
    await dispatch(
      addFeedback({
        author: user,
        title: data.title,
        category: data.category,
        type: data.type,
        description: data.description,
        projectId: router.query.id as string,
      })
    );

    router.back();
  };

  return (
    <>
      <div className="container mt-10 sm:mt-0 sm:pt-10">
        <div className="absolute top-10 z-20 sm:static sm:pl-10 md:pl-24 lg:pl-48">
          <BackBtn disabled={loading} />
        </div>
      </div>

      <div
        className={`sm:pt-20 sm:pb-24 xl:pb-0 xl:pt-5  ${
          projectById?.owner === user.uid && "xl:pb-14 xl:pt-20"
        } `}
      >
        <CardContainer>
          <div className="bg-gradient w-10 h-10 rounded-full hidden sm:flex items-center justify-center  absolute -top-5">
            <FaPlus className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-semibold mb-5">New Feedback</h1>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="title"
              name="title"
              labelHelperText="Add a short, descriptive headline"
              register={register}
              errors={errors}
              rules={feedbackSchema.title}
              disabled={loading}
            />

            <div className="form-control mb-4">
              <label className="label font-medium">
                <span className="label-text capitalize">Category</span>
              </label>

              <select
                className="select font-normal input w-full"
                defaultValue=""
                disabled={loading}
                {...register("category", feedbackSchema.category)}
              >
                <option disabled value="">
                  Pick a category for your feedback
                </option>
                <option>UI</option>
                <option>UX</option>
                <option>Bug</option>
                <option>Feature</option>
                <option>Enhancement</option>
              </select>

              {errors.category && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.category.message}
                  </span>
                </label>
              )}
            </div>

            {projectById?.owner === user.uid && (
              <div className="form-control mb-4">
                <label className="label font-medium">
                  <span className="label-text capitalize">Type</span>
                </label>

                <select
                  className="select font-normal input w-full"
                  defaultValue=""
                  disabled={loading}
                  {...register("type", feedbackSchema.type)}
                >
                  <option disabled value="">
                    Pick a type for your feedback
                  </option>
                  <option>Suggestion</option>
                  <option>Planned</option>
                  <option>In-Progress</option>
                  <option>Live</option>
                </select>

                {errors.type && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.type.message}
                    </span>
                  </label>
                )}
              </div>
            )}

            <Textarea
              label="description"
              name="description"
              labelHelperText="Tell us about things that should be added, improved etc."
              register={register}
              errors={errors}
              rules={feedbackSchema.description}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full mt-5 ${loading && "loading"}`}
            >
              Add Feedback
            </button>
          </form>
        </CardContainer>
      </div>
    </>
  );
}

export default AddFeedbackForm;
