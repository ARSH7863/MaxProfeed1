import type { NextPage } from "next";

import Meta from "../../components/Misc/Meta";
import withPrivateRoute from "../../components/Misc/withPrivateRoute";
import AddProjectForm from "../../components/Projects/AddProjectForm";

const AddProject: NextPage = () => {
  return (
    <>
      <Meta title="New project" />
      <AddProjectForm />
    </>
  );
};

export default withPrivateRoute(AddProject);
