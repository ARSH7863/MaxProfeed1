import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CardContainer from "../UI/CardContainer";

const tabs = ["login", "signup"];

function AuthForm() {
  const router = useRouter();
  const { loading } = useSelector((state: AppState) => state.auth);
  const [activeTab, setActiveTab] = useState("");

  const randomAvatarLink = `https://avatars.dicebear.com/api/avataaars/${new Date().toISOString()}.svg`;
  const [avatar, setAvatar] = useState(randomAvatarLink);

  useEffect(() => {
    const tab = router.query.tab;
    const active = tabs.includes(tab as string) ? tab : "login";
    setActiveTab(active as string);
  }, [router.query.tab]);

  const handleTabChange = (newActiveTab: string) => {
    if (!loading) {
      setAvatar(randomAvatarLink);
      const newTab = tabs.includes(newActiveTab) ? newActiveTab : "login";
      router.replace(`${router.pathname}?tab=${newTab}`);
    }
  };

  return (
    <CardContainer>
      <img
        src={avatar}
        alt="avatar"
        className="w-20 sm:w-24 h-20 sm:h-24 rounded-full mb-10 self-center"
      />

      <div className="tabs mb-7 w-full">
        <a
          className={`tab tab-lg w-1/2 tab-bordered border-b-4 ${
            activeTab === "login" && "tab-active"
          }`}
          onClick={() => handleTabChange("login")}
        >
          Login
        </a>
        <a
          className={`tab tab-lg w-1/2 tab-bordered border-b-4 ${
            activeTab === "signup" && "tab-active"
          }`}
          onClick={() => handleTabChange("signup")}
        >
          Sign Up
        </a>
      </div>

      {activeTab === "login" ? <LoginForm /> : <SignupForm avatar={avatar} />}
    </CardContainer>
  );
}

export default AuthForm;
