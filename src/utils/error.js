const DEFAULT_ERROR_MESSAGE = "Something went wrong, please try again later";
const ERROR_CODE_MESSAGES = {
  "auth/invalid-email": "Invalid email address",
  "auth/email-already-in-use": "Email is already in use",
  "auth/email-already-exists": "Email is already in use",
  "auth/user-disabled": "User is disabled, please contact support",
  "auth/user-not-found": "Invalid email or password",
  "auth/wrong-password": "Invalid email or password",
  "auth/invalid-password": "Password must be at least 6 characters long",
  "auth/weak-password": "Password must be at least 6 characters long",
};

export const getErrorMessage = (error) => {
  if (error) {
    if (error.code) {
      return ERROR_CODE_MESSAGES[error.code] || DEFAULT_ERROR_MESSAGE;
    }
    return DEFAULT_ERROR_MESSAGE;
  }
  return null;
};
