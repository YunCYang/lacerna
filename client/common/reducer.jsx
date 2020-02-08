import shadow from './reducers/shadow';
import search from './reducers/search';
import auth from './reducers/auth';
import { combineReducers } from 'redux';

export default combineReducers({
  shadow,
  search,
  auth
});
