import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

import { AppState } from "../../store";
import { Feedback } from "../../TS/models";
import Live from "./Live";
import Planned from "./Planned";
import BackBtn from "../UI/BackBtn";
import InProgress from "./InProgress";

interface FeedbacksByCategory {
  Planned: Feedback[];
  "In-Progress": Feedback[];
  Live: Feedback[];
}

function Roadmap() {
  const [planned, setPlanned] = useState<Feedback[]>([]);
  const [inProgress, setInProgress] = useState<Feedback[]>([]);
  const [live, setLive] = useState<Feedback[]>([]);

  const router = useRouter();
  const { filteredFeedbacks } = useSelector(
    (state: AppState) => state.feedback
  );

  useEffect(() => {
    const feedbacksByCategory: FeedbacksByCategory = {
      Planned: [],
      "In-Progress": [],
      Live: [],
    };

    const sortedFeedbacks = filteredFeedbacks.reduce((acc, feedback) => {
      feedback.type &&
        acc[feedback.type as keyof typeof feedbacksByCategory] &&
        acc[feedback.type as keyof typeof feedbacksByCategory].push(feedback);

      return acc;
    }, feedbacksByCategory);

    setPlanned(sortedFeedbacks.Planned);
    setInProgress(sortedFeedbacks["In-Progress"]);
    setLive(sortedFeedbacks.Live);
  }, [filteredFeedbacks]);

  return (
    <div className="pt-14">
      <BackBtn />

      <div className="mt-5 py-4 px-6 bg-secondary rounded-xl sm:flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg text-white font-semibold ml-2">Roadmap</h2>
        </div>

        <Link href={`/projects/${router.query.id}/feedback/new`} passHref>
          <button className="btn btn-primary btn-sm text-xs sm:btn-md mt-5 sm:mt-0">
            <FaPlus className="mr-1" size={11} /> Add Feedback
          </button>
        </Link>
      </div>

      <div className="md:grid md:grid-cols-3 mt-12">
        <div className="md:pr-7 pb-10 md:pb-0">
          <Planned feedbacks={planned} />
        </div>
        <div className="pb-10 md:py-0">
          <InProgress feedbacks={inProgress} />
        </div>
        <div className="md:pl-7 pb-10 md:pb-0">
          <Live feedbacks={live} />
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
