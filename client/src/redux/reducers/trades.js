import { GET_TRADES } from "../actions/singletrade";

const initialState = {
  content: [],
};

const tradesByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRADES:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default tradesByIdReducer;
