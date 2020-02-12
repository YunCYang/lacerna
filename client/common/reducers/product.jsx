import { STOCK } from '../constants/action-types';

const product = (state = { product: [] }, action) => {
  if (action.type === STOCK) return { ...state, product: action.payload };
  else return state;
};

export default product;
