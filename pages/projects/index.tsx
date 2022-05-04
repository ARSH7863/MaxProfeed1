import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

import { AppState } from "../../store";
import { getUsersProjects } from "../../store/projects/side-effects";
import Meta from "../../components/Misc/Meta";
import Spinner from "../../components/UI/Spinner";
import Navbar from "../../components/Landing/Navbar";
import Projects from "../../components/Projects/Projects";
import withPrivateRoute from "../../components/Misc/withPrivateRoute";

const ProjectsPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector(
    (state: AppState) => state.auth
  );
  const { projects, loading } = useSelector(
    (state: AppState) => state.projects
  );

  useEffect(() => {
    dispatch(getUsersProjects(user.uid));
  }, [dispatch, user.uid]);

  return (
    <div className="container min-h-screen pb-16">
      <Meta title="Projects" />
      <Navbar />

      <div className="mt-20 p-7 bg-secondary rounded-lg flex items-center justify-between">
        <h1 className="text-2xl text-white font-medium">Projects</h1>
        <button
          className="btn btn-primary btn-sm text-xs sm:btn-md"
          onClick={() => router.push(`${router.pathname}/new`)}
        >
          <FaPlus className="mr-1" size={11} />
          New project
        </button>
      </div>

      {loading || authLoading ? (
        <div className="mt-20">
          <Spinner />
        </div>
      ) : !!projects.length ? (
        <Projects projects={projects} />
      ) : (
        <div className="flex flex-col items-center mt-10">
          <img src="/images/empty.svg" alt="Empty page" />
          <p className="text-center mt-5">
            We could not find any projects
            <br />
            Let&apos;s{" "}
            <span className="text-primary">
              <Link href={`${router.pathname}/new`}>create</Link>
            </span>{" "}
            one
          </p>
        </div>
      )}
    </div>
  );
};

export default withPrivateRoute(ProjectsPage);
