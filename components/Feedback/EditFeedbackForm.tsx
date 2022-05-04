import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";

import { AppState } from "../../store";
import { feedbackSchema } from "./utils/schemas";
import { FeedbackFormFields } from "../../TS/models";
import { updateFeedback } from "../../store/feedback/side-effects";
import Input from "../UI/Input";
import BackBtn from "../UI/BackBtn";
import Textarea from "../UI/Textarea";
import CardContainer from "../UI/CardContainer";
import DeleteFeedbackModal from "./DeleteFeedbackModal";

function EditFeedbackForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { feedbackById, updating } = useSelector(
    (state: AppState) => state.feedback
  );

  const isOwnerOfTheProject =
    feedbackById?.projectOwner === feedbackById?.author.uid;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormFields>({ mode: "onTouched" });

  const onSubmit = async (data: FeedbackFormFields) => {
    if (
      data.title === feedbackById?.title &&
      data.description === feedbackById.description &&
      data.category === feedbackById.category &&
      data.type === feedbackById.type
    ) {
      return;
    }

    await dispatch(
      updateFeedback({
        title: data.title,
        description: data.description,
        category: data.category,
        type: data.type,
        projectId: router.query.id as string,
        feedbackId: router.query.feedbackId as string,
        authorId: feedbackById?.author.uid as string,
      })
    );

    router.back();
  };

  return (
    <>
      <div className="container mt-10 sm:mt-0 sm:pt-10">
        <div className="absolute top-10 z-20 sm:static sm:pl-10 md:pl-24 lg:pl-48">
          <BackBtn disabled={updating} />
        </div>
      </div>

      <div
        className={`sm:pt-20 sm:pb-24 xl:pb-0 xl:pt-5  ${
          isOwnerOfTheProject && "xl:pb-14 xl:pt-20"
        } `}
      >
        <CardContainer>
          <div className="bg-gradient w-10 h-10 rounded-full hidden sm:flex items-center justify-center  absolute -top-5">
            <MdEdit className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-semibold mb-5">Edit Feedback</h1>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="title"
              name="title"
              defaultValue={feedbackById?.title}
              labelHelperText="Add a short, descriptive headline"
              register={register}
              errors={errors}
              rules={feedbackSchema.title}
              disabled={updating}
            />

            <div className="form-control mb-4">
              <label className="label font-medium">
                <span className="label-text capitalize">Category</span>
              </label>

              <select
                className="select font-normal input w-full"
                defaultValue={feedbackById?.category}
                disabled={updating}
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

            {isOwnerOfTheProject && (
              <div className="form-control mb-4">
                <label className="label font-medium">
                  <span className="label-text capitalize">Type</span>
                </label>

                <select
                  className="select font-normal input w-full"
                  defaultValue={feedbackById?.type}
                  disabled={updating}
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
              defaultValue={feedbackById?.description}
              register={register}
              errors={errors}
              rules={feedbackSchema.description}
              disabled={updating}
            />

            <button
              type="submit"
              disabled={updating}
              className={`btn btn-primary w-full mt-5 ${updating && "loading"}`}
            >
              Update
            </button>
          </form>

          <label
            htmlFor="delete-feedback-modal"
            className="btn btn-error w-full mt-3 modal-button"
          >
            Delete Feedback
          </label>

          <input
            type="checkbox"
            id="delete-feedback-modal"
            className="modal-toggle"
            disabled={updating}
          />

          <DeleteFeedbackModal
            labelId="delete-feedback-modal"
            projectId={feedbackById!.projectId}
            feedbackId={feedbackById!.id}
            title={feedbackById!.title}
            feedbackAuthor={feedbackById!.author.uid}
          />
        </CardContainer>
      </div>
    </>
  );
}

export default EditFeedbackForm;
