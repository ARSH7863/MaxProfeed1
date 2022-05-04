import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getFeedbacks } from "../../../store/feedback/side-effects";
import Roadmap from "../../../components/Roadmap/Roadmap";

const RoadmapPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    router.query.id && dispatch(getFeedbacks(router.query.id as string));
  }, [dispatch, router.query.id]);

  return (
    <div className="container min-h-screen">
      <Roadmap />
    </div>
  );
};

export default RoadmapPage;
