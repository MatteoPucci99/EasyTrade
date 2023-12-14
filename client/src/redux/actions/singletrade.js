export const API = "http://localhost:5000/singletrade";
export const CREATE_TRADE = "CREATE_TRADE";
export const GET_TRADES = "GET_TRADES";
export const UPDATE_TRADE = "UPDATE_TRADE";
export const REMOVE_TRADE = "REMOVE_TRADE";

export const createTradeAction = (obj, handleAlert) => {
  return async (dispatch) => {
    fetch(`${API}/createtrade`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel invio dei dati");
        }
      })
      .then((singleTrade) => {
        dispatch({
          type: CREATE_TRADE,
          payload: singleTrade,
        });
        handleAlert(true);
        dispatch(getTradesByIdAction(obj.strategyId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTradesByIdAction = (strategyId) => {
  return async (dispatch) => {
    fetch(`${API}/gettrades/${strategyId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: GET_TRADES,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateTradeAction = (obj, handleAlert) => {
  return async (dispatch) => {
    fetch(`${API}/updatetrade/${obj._id}`, {
      method: "PATCH",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nella modifica dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: UPDATE_TRADE,
          payload: data,
        });
        handleAlert(true);
        dispatch(getTradesByIdAction(obj.strategyId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeTradeAction = (obj, handleDeleteAlert) => {
  return async (dispatch) => {
    fetch(`${API}/deletetrade/${obj._id}`, {
      method: "DELETE",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nella modifica dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: REMOVE_TRADE,
          payload: data,
        });
        handleDeleteAlert(true);
        dispatch(getTradesByIdAction(obj.strategyId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
