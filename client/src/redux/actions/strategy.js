export const API = "http://localhost:5000/strategies";
export const SET_STRATEGY = "SET_STRATEGY";
export const GET_STRATEGY = "GET_STRATEGY";
export const UPDATE_STRATEGY = "UPDATE_STRATEGY";
export const REMOVE_STRATEGY = "REMOVE_STRATEGY";

export const setStrategyAction = (obj, handleAlert) => {
  return async (dispatch) => {
    fetch(API, {
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
      .then((strategy) => {
        dispatch({
          type: SET_STRATEGY,
          payload: strategy,
        });
        handleAlert(true);
        dispatch(getStrategyAction());
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
};

export const getStrategyAction = () => {
  return async (dispatch) => {
    fetch(API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: GET_STRATEGY,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateStrategyAction = (obj, handleAlert) => {
  return async (dispatch) => {
    fetch(`${API}/${obj._id}`, {
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
          type: UPDATE_STRATEGY,
          payload: data,
        });
        handleAlert(true);
        dispatch(getStrategyAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeStrategyAction = (obj, handleDeleteAlert) => {
  return async (dispatch) => {
    fetch(`${API}/${obj._id}`, {
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
          type: REMOVE_STRATEGY,
          payload: data,
        });
        handleDeleteAlert(true);
        dispatch(getStrategyAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
