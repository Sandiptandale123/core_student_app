import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as ReduxThunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  userState: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk.thunk));

export default store;
