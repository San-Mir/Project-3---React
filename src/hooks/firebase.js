import { useCallback, useRef, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { firebase } from "../services";
import { auth } from "../services/firebase";

const EMAIL_VERIFICATION = process.env.REACT_APP_EMAIL_VERIFICATION === "true";

export const useGoogleSignIn = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const googleSignIn = useCallback(async () => {
    setLoading(true);
    const [user, error] = await firebase.loginWithGoogle();
    setUser(user);
    setError(error);
    setLoading(false);
    return user;
  }, []);

  return [googleSignIn, loading, error, user];
};

export const useLogout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [signout, loading, error] = useSignOut(auth);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef();
  // Fake loading
  const logout = useCallback(async () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      await signout();
      if (pathname === "/chat") {
        navigate("/");
      }
      setIsLoading(false);
    }, 2000);
    timeoutRef.current = timeout;
  }, [navigate, pathname, signout]);

  return [logout, isLoading || loading, error];
};

export const useAuth = () => useAuthState(auth);

export const useRegisterUser = () =>
  useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: EMAIL_VERIFICATION,
  });

export const useEmailSignIn = () => useSignInWithEmailAndPassword(auth);
