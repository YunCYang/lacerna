import { AUTH } from '../constants/action-types';

const auth = (state = { auth: sessionStorage.getItem('id') ? parseInt(sessionStorage.getItem('id')) : null }, action) => {
  if (action.type === AUTH) return { ...state, auth: action.payload };
  else return state;
};

export default auth;
