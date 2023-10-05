import { useEffect, useLayoutEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useEmailSignIn, useGoogleSignIn } from "../../hooks";
import { getErrorMessage } from "../../utils";
import { FullPageLoader } from "../Loader";

export const Login = () => {
  const [user] = useAuth();
  const navigate = useNavigate();
  const [emailSignIn, , emailLoading, error] = useEmailSignIn();
  const [signInWithGoogle, googleLoading] = useGoogleSignIn();
  const [errorMessage, setErrorMessage] = useState(null);
  const loading = emailLoading || googleLoading;

  const clearError = () => {
    setErrorMessage();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await emailSignIn(email, password);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }, [error]);

  useLayoutEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex flex-col grow items-center justify-center p-2">
      {(loading || user) && <FullPageLoader />}
      <div className="w-full rounded-lg shadow border max-w-md bg-gray-800 border-gray-700">
        <div className="p-6 flex flex-col gap-4 justify-center">
          <h1 className="text-xl font-bold text-center">Welcome to MoviesDB</h1>
          <button
            onClick={signInWithGoogle}
            className="btn rounded-3xl btn-info"
          >
            <BsGoogle size={20} />
            Login with Google
          </button>

          <div className="flex items-center justify-between">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            <span className="px-4">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-error">
                <AiOutlineCloseCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="input w-full input-info bg-gray-700"
                onChange={clearError}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={clearError}
                className="input w-full input-info bg-gray-700"
                required
              />
            </div>
            <button type="submit" className="w-full btn btn-info">
              Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline"
              >
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
