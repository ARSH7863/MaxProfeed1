import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../../store";
import { getProjectById } from "../../../store/projects/side-effects";
import Meta from "../../../components/Misc/Meta";
import Spinner from "../../../components/UI/Spinner";
import NotFound from "../../../components/UI/NotFound";
import Navbar from "../../../components/Landing/Navbar";
import ProjectById from "../../../components/Projects/ProjectById";

const ProjectByIdPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state: AppState) => state.auth);
  const { projectById, loading } = useSelector(
    (state: AppState) => state.projects
  );

  useEffect(() => {
    router.query.id && dispatch(getProjectById(router.query.id as string));
  }, [dispatch, router.query.id]);

  return (
    <div className="container min-h-screen">
      <Meta title={projectById?.name} />
      <Navbar />

      {authLoading || loading ? (
        <div className="pt-32">
          <Spinner />
        </div>
      ) : projectById ? (
        <ProjectById project={projectById} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ProjectByIdPage;
