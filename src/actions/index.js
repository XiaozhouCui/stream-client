import streams from "../apis/streams";
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

// use redux-thunk and axios to handle createStream action
export const createStream = (formValues) => {
  return async (dispatch) => {
    streams.post("/streams", formValues); // axios instance with baseURL = localhost:3001
  }
}
