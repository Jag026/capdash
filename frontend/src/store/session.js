import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_CRYPTO_NAMES = 'session/setCryptoNames';
const SET_STOCK_NAMES = 'session/setStockNames';

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

const setCryptos = (cryptos) => {
  return {
    type: SET_CRYPTO_NAMES,
    payload: cryptos,
  };
};

const setStocks = (stocks) => {
  return {
    type: SET_STOCK_NAMES,
    payload: stocks,
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
    case SET_CRYPTO_NAMES:
      newState = Object.assign({}, state);
      newState.cryptos = action.payload;
      return newState;
    case SET_STOCK_NAMES:
      newState = Object.assign({}, state);
      newState.stocks = action.payload;
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

export const getCryptoNames = () => async dispatch => {
  const response = await csrfFetch('/api/session/fetch-crypto-asset-names');
  const data = await response.json();
  dispatch(setCryptos(data));
  return data;
};

export const getStockNames = () => async dispatch => {
  const response = await csrfFetch('/api/session/fetch-stock-asset-names');
  const data = await response.json();
  dispatch(setStocks(data));
  return data;
};

export default sessionReducer;