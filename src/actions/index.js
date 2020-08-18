import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId, // Google ID from argument
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
