import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

import { AppState } from "../../store";

function RoadmapTasksCard() {
  const router = useRouter();

  const [noOfPlanned, setNoOfPlanned] = useState(0);
  const [noOfProgress, setNoOfProgress] = useState(0);
  const [noOfLive, setNoOfLive] = useState(0);
  const { feedbacks } = useSelector((state: AppState) => state.feedback);
  const { projectById } = useSelector((state: AppState) => state.projects);

  useEffect(() => {
    const feedTypes = { Planned: 0, "In-Progress": 0, Live: 0 };

    const sortedFeedbacks = feedbacks.reduce((acc, feedback) => {
      if (feedback.type && acc[feedback.type as keyof typeof feedTypes] >= 0) {
        acc[feedback.type as keyof typeof feedTypes]++;
      }
      return acc;
    }, feedTypes);

    setNoOfPlanned(sortedFeedbacks.Planned);
    setNoOfProgress(sortedFeedbacks["In-Progress"]);
    setNoOfLive(sortedFeedbacks.Live);
  }, [feedbacks]);

  return (
    <div className="card bg-white mt-5 rounded-xl">
      <div className="card-body">
        <div className="card-title justify-between">
          <h2>Roadmap</h2>
          <Link
            href={`${router.pathname}/roadmap`}
            as={`${projectById!.id}/roadmap`}
            passHref
          >
            <button className="btn capitalize text-accent btn-ghost p-0 hover:bg-transparent">
              View
            </button>
          </Link>
        </div>

        <div className="flex justify-between mt-2">
          <div>
            <div className="badge badge-warning badge-xs"></div>
            <span className="ml-3">Planned</span>
          </div>
          <span className="font-bold">{noOfPlanned}</span>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <div className="badge badge-primary badge-xs"></div>
            <span className="ml-3">In Progress</span>
          </div>
          <span className="font-bold">{noOfProgress}</span>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <div className="badge badge-info badge-xs"></div>
            <span className="ml-3">Live</span>
          </div>
          <span className="font-bold">{noOfLive}</span>
        </div>
      </div>
    </div>
  );
}

export default RoadmapTasksCard;
