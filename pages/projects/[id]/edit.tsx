import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../store";
import { getProjectById } from "../../../store/projects/side-effects";
import Meta from "../../../components/Misc/Meta";
import Spinner from "../../../components/UI/Spinner";
import NotFound from "../../../components/UI/NotFound";
import EditProjectForm from "../../../components/Projects/EditProjectForm";
import withPrivateRoute from "../../../components/Misc/withPrivateRoute";

const EditProject: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: authLoading, user } = useSelector(
    (state: AppState) => state.auth
  );
  const { projectById, loading } = useSelector(
    (state: AppState) => state.projects
  );

  useEffect(() => {
    router.query.id && dispatch(getProjectById(router.query.id as string));
  }, [dispatch, router.query.id]);

  return (
    <>
      <Meta title={`Edit ${projectById?.name}`} />

      <div className="min-h-screen">
        {authLoading || loading ? (
          <div className="pt-32">
            <Spinner />
          </div>
        ) : projectById && user.uid === projectById.owner ? (
          <EditProjectForm />
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
};

export default withPrivateRoute(EditProject);
