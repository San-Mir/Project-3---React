import { BsChatRight, BsFilm } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";

const Line = () => (
  <div className="h-1 bg-info rounded-2xl w-full absolute bottom-0" />
);

export const BottomNav = () => {
  const [user] = useAuth();
  const { pathname } = useLocation();
  const homeLink = pathname === "/" || pathname.startsWith("/details");
  return (
    <nav className="btm-nav btm-nav-md md:hidden">
      <Link to={homeLink ? undefined : "/"}>
        <BsFilm size={20} className="text-info hover:opacity-60" />
        {homeLink && <Line />}
      </Link>
      {user && (
        <Link to="/chat">
          <BsChatRight size={20} className="text-info hover:opacity-60" />
          {pathname === "/chat" && <Line />}
        </Link>
      )}
    </nav>
  );
};

export default BottomNav;
