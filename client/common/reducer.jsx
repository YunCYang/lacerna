import shadow from './reducers/shadow';
import search from './reducers/search';
import { combineReducers } from 'redux';

export default combineReducers({
  shadow,
  search
});
