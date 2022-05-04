import type { NextPage } from "next";

import Auth from "../components/Auth/Auth";
import Meta from "../components/Misc/Meta";
import withPublicRoute from "../components/Misc/withPublicRoute";

const AuthForms: NextPage = () => {
  return (
    <>
      <Meta title="Authentication" />
      <Auth />
    </>
  );
};

export default withPublicRoute(AuthForms);
