import { SELECT_TYPE } from '../constants/action-types';

const type = (state = null, action) => {
  if (action.type === SELECT_TYPE) {
    return { type: action.payload };
  } else {
    return state;
  }
};

export default type;