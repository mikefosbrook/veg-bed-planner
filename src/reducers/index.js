import beds from './beds';
// import anotherReducer from './anotherReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  beds,
  // anotherReducer
});

export default rootReducer;
