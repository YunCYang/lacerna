import shadow from './reducers/shadow';
import search from './reducers/search';
import auth from './reducers/auth';
import modal from './reducers/modal';
import product from './reducers/product';
import select from './reducers/select';
import { combineReducers } from 'redux';

export default combineReducers({
  shadow,
  search,
  auth,
  modal,
  product,
  select
});
