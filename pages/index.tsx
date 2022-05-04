import type { NextPage } from "next";

import Meta from "../components/Misc/Meta";
import Navbar from "../components/Landing/Navbar";
import Header from "../components/Landing/Header";
import ProjectsSection from "../components/Landing/ProjectsSection";

const Home: NextPage = () => {
  return (
    <div className="container">
      <Meta />
      <Navbar />
      <Header />
      <ProjectsSection />
    </div>
  );
};

export default Home;
