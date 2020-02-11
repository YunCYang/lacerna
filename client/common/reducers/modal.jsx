import { POP } from '../constants/action-types';

const modal = (state = {
  modal: {
    type: 'disclaimer'
  }
}, action) => {
  if (action.type === POP) return { ...state, modal: action.payload };
  else return state;
};

export default modal;
