// Array-based approach
let streamReducer = (state = [], action) => {
  switch (action.type) {
    case "EDIT_STREAM":
      return state.map((stream) => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });
    default:
      return state;
  }
};

// Object-based approach
let streamReducer = (state={}, action) => {
  switch (action.type) {
    case "EDIT_STREAM":
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      return { ...state, [action.payload.id]: action.payload }; // key-interpolation: same as above 3 lines
    default:
      return state;
  }
}