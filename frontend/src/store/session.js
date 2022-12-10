import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_CRYPTO_NAMES = 'session/setCryptoNames';
const SET_STOCK_NAMES = 'session/setStockNames';
const SET_CRYPTO_DATA = 'session/setCryptoData';
const SET_STOCK_DATA = 'session/setStockData';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setCryptoData = (cryptoData) => {
  return {
    type: SET_CRYPTO_DATA,
    payload: cryptoData,
  };
};

const setStockData = (stockData) => {
  return {
    type: SET_STOCK_DATA,
    payload: stockData,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = {
  user: null,
  cryptos: null,
  stocks: null,
  cryptoData: null,
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_CRYPTO_DATA:
      newState = Object.assign({}, state);
      newState.cryptoData = action.payload;
      return newState;
    case SET_STOCK_DATA:
      newState = Object.assign({}, state);
      newState.stockData = action.payload;
      return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const getAllCryptoData= () => async dispatch => {
  const response = await csrfFetch('/api/session/fetch-all-crypto-data');
  const data = await response.json();
  dispatch(setCryptoData(data.cryptoData["data"])); 
  return data.cryptoData["data"];
};

export const getStockData= () => async dispatch => {
  const response = await csrfFetch('/api/session/fetch-stock-data');
  const data = await response.json();
  dispatch(setStockData(data)); 
  return data;
};

export default sessionReducer;