import { SHOW_SHADOW } from '../constants/action-types';

const shadow = (state = { shadow: false }, action) => {
  if (action.type === SHOW_SHADOW) return { ...state, shadow: action.payload };
  else return state;
};

export default shadow;
