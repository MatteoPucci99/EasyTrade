import { GET_STRATEGY } from "../actions/strategy";

const initialState = {
  content: [],
};

const strategyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STRATEGY:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default strategyReducer;
