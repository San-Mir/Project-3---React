import { AiOutlineUser } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsChatRight } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../../hooks";
import { FullPageLoader } from "../Loader";

export const NavBar = () => {
  const [user] = useAuth();
  const [logout, loading] = useLogout();
  const { key } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 text-info grid grid-cols-3 md:flex">
      {loading && <FullPageLoader />}
      <div className="md:hidden">
        {key === "default" || (
          <button
            className="btn btn-ghost btn-circle md:hidden"
            onClick={() => navigate(-1)}
          >
            <BiArrowBack size={20} />
          </button>
        )}
      </div>
      <div className="flex-1 m-auto">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          MoviesDB
        </Link>
      </div>
      <div className="flex justify-end gap-2">
        <div className="hidden gap-2 justify-end md:flex">
          {user && (
            <Link to="/chat">
              <button className="btn btn-ghost btn-circle">
                <BsChatRight size={20} />
              </button>
            </Link>
          )}
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <AiOutlineUser size={20} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <AiOutlineUser size={20} />
            </label>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
