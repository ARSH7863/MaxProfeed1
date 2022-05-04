import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import Link from "next/link";

import { AppState } from "../../store";
import { logout } from "../../store/auth/side-effects";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";

function Navbar() {
  const authLoading = useAuthStateChanged();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthed, user, loading } = useSelector(
    (state: AppState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="pt-7 flex items-center">
      <h4 className="flex-1 text-2xl sm:text-3xl ml-2 font-brand cursor-pointer">
        <Link href="/">Profeed</Link>
      </h4>

      {!isAuthed && !loading && !authLoading ? (
        <>
          <Link href="/auth?tab=login" passHref>
            <button className="btn btn-primary btn-sm text-xs sm:btn-md">
              Login
            </button>
          </Link>
          <Link href="/auth?tab=signup" passHref>
            <button className="btn btn-secondary btn-sm text-xs sm:btn-md ml-3 md:ml-5">
              Sign up
            </button>
          </Link>
        </>
      ) : (
        !loading &&
        !authLoading && (
          <>
            <div className="dropdown dropdown-end">
              <img
                tabIndex={0}
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2 cursor-pointer"
              />

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={() => router.push("/projects")}>
                    <AiOutlineFundProjectionScreen
                      className="text-primary"
                      size={18}
                    />
                    Projects
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>
                    <MdLogout className="text-primary" size={18} />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default Navbar;
