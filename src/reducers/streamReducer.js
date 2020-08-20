import { FETCH_STREAM, FETCH_STREAMS, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // action.payload is an array of obj, use _.mapKeys() to convert the array into one mega object
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      // add a new key-value pair using key-interpolation
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      // add a new key-value pair using key-interpolation
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      // replace an existing key-value pair using key-interpolation
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // _.omit will return a new object
      // "action.payload" is the ID to be removed (refer to action creator)
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
