import * as api from "../../api/index.js";

export const API = "http://localhost:3001/singletrade";
export const CREATE_TRADE = "CREATE_TRADE";
export const GET_TRADES = "GET_TRADES";
export const UPDATE_TRADE = "UPDATE_TRADE";
export const REMOVE_TRADE = "REMOVE_TRADE";

export const createTradeAction = (obj, handleAlert) => {
  return async (dispatch) => {
    try {
      const { data } = await api.createTrade(obj);
      dispatch({ type: CREATE_TRADE, payload: data });
      dispatch(getTradesByIdAction(obj.strategyId));
      handleAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTradesByIdAction = (strategyId) => {
  return async (dispatch) => {
    try {
      const { data } = await api.getTradesById(strategyId);
      dispatch({ type: GET_TRADES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateTradeAction = (obj, handleAlert) => {
  return async (dispatch) => {
    try {
      const { data } = await api.updateTrade(obj);
      dispatch({ type: UPDATE_TRADE, payload: data });
      dispatch(getTradesByIdAction(obj.strategyId));
      handleAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeTradeAction = (obj, handleDeleteAlert) => {
  return async (dispatch) => {
    try {
      const { data } = await api.deleteTrade(obj);
      dispatch({ type: REMOVE_TRADE, payload: data });
      dispatch(getTradesByIdAction(obj.strategyId));
      handleDeleteAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
};
