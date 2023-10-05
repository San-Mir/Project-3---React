import { BottomNav } from "./BottomNav";
import { NavBar } from "./NavBar";

export const Navigation = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <NavBar />
      <main className="flex flex-col pb-16 w-full grow md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Navigation;
