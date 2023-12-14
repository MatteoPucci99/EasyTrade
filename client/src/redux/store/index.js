import { combineReducers, configureStore } from "@reduxjs/toolkit";
import strategyReducer from "../reducers/strategy";
import tradesByIdReducer from "../reducers/trades";

const myReducer = combineReducers({
  strategy: strategyReducer,
  trades: tradesByIdReducer,
});

const store = configureStore({
  reducer: myReducer,
});

export default store;
