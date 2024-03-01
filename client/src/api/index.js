import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/" });

//strategies
//post
export const setStrategy = (obj, handleAlert) =>
  API.post("/strategies", obj, handleAlert);
//get
export const getStrategy = () => API.get("/strategies");
//patch
export const updateStrategy = (obj, handleAlert) =>
  API.patch(`/strategies/${obj._id}`, obj, handleAlert);
//delete
export const deleteStrategy = (obj, handleAlert) =>
  API.delete(`/strategies/${obj._id}`, handleAlert);

//singletrade
//post
export const createTrade = (obj, handleAlert) =>
  API.post("/singletrade/createtrade", obj, handleAlert);
//get by id
export const getTradesById = (strategyId) =>
  API.get(`/singletrade/gettrades/${strategyId}`);
//patch
export const updateTrade = (obj, handleAlert) =>
  API.patch(`/singletrade/updatetrade/${obj._id}`, obj, handleAlert);
//delete
export const deleteTrade = (obj, handleDeleteAlert) =>
  API.delete(`/singletrade/deletetrade/${obj._id}`, obj, handleDeleteAlert);
