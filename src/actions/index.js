import streams from "../apis/streams";
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM } from "./types";

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

// use axios and redux-thunk to handle HTTP requests

// add a new stream as a logged in user
export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    // get the user ID from redux state.auth.userId
    const { userId } = getState().auth;
    // first send POST request to server
    // "streams" is an axios instance with baseURL = localhost:3001
    const response = await streams.post("/streams", { ...formValues, userId });
    // after we got response, dispatch the action to reducer
    dispatch({ type: CREATE_STREAM, payload: response.data });
    // Do some programmatic navigation to get the user back to the root route
    // require("history").createBrowserHistory
    
  };
};

// get all streams
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// get a single stream
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// update a stream
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
};

// delete a stream
export const deleteStream = (id) => async (dispatch) => {
  // delete request won't return any response
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};