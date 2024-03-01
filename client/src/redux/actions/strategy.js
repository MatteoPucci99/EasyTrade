import * as api from "../../api/index.js";

export const API = "http://localhost:3001/strategies";
export const SET_STRATEGY = "SET_STRATEGY";
export const GET_STRATEGY = "GET_STRATEGY";
export const UPDATE_STRATEGY = "UPDATE_STRATEGY";
export const REMOVE_STRATEGY = "REMOVE_STRATEGY";

//createStrategy
export const setStrategyAction = (obj, handleAlert) => {
  return async (dispatch) => {
    try {
      const { data } = await api.setStrategy(obj);
      dispatch({ type: SET_STRATEGY, payload: data });
      dispatch(getStrategyAction());
      handleAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
};
//getStrategy
export const getStrategyAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.getStrategy();
      dispatch({ type: GET_STRATEGY, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
//updateStrategy
export const updateStrategyAction = (obj, handleAlert) => {
  return async (dispatch) => {
    try {
      const { data } = await api.updateStrategy(obj);
      dispatch({ type: UPDATE_STRATEGY, payload: data });
      handleAlert(true);
      dispatch(getStrategyAction());
    } catch (error) {
      console.log(error);
    }
  };
};
//deleteStrategy
export const removeStrategyAction = (obj, handleDeleteAlert) => {
  return async (dispatch) => {
    try {
      const data = await api.deleteStrategy(obj);
      dispatch({ type: REMOVE_STRATEGY, payload: data });
      dispatch(getStrategyAction());
      handleDeleteAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
};
