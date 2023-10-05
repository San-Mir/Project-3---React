import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row mt-0 md:-mt-32 grow justify-between px-4 py-24 items-center gap-16 ">
      <div className="flex w-full justify-center">
        <div className="max-w-[420px] flex flex-col gap-6">
          <h1 className="font-bold text-4xl lg:text-6xl">Oops!</h1>
          <h2 className="font-bold text-xl lg:text-2xl">
            Looks like you found your way to nothing :(
          </h2>
          <p>Please visit our hompage to get to where you need to go.</p>
          <button className="btn btn-info w-full sm:w-fit">
            <Link
              to="/"
              className="w-full h-full flex justify-center items-center"
            >
              Take me there!
            </Link>
          </button>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <img src="/404.png" alt="404 Not Found" />
      </div>
    </div>
  );
};

export default NotFound;
