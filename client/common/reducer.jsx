import shadow from './reducers/shadow';
import search from './reducers/search';
import auth from './reducers/auth';
import modal from './reducers/modal';
import { combineReducers } from 'redux';

export default combineReducers({
  shadow,
  search,
  auth,
  modal
});
