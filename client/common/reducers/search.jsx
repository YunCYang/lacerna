import { SEARCH } from '../constants/action-types';

const search = (state = { search: { type: 'type', value: 'all' } }, action) => {
  if (action.type === SEARCH) return { ...state, search: action.payload };
  else return state;
};

export default search;
