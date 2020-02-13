import { SELECT_PRODUCT } from '../constants/action-types';

const select = (state = { select: null }, action) => {
  if (action.type === SELECT_PRODUCT) return { ...state, select: action.payload };
  else return state;
};

export default select;
