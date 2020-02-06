import type from './reducers/type';
import shadow from './reducers/shadow';
import { combineReducers } from 'redux';

export default combineReducers({
  type,
  shadow
});
