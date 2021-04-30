import {createStore, combineReducers, applyMiddleware} from 'redux'; 
import {composeWithDevTools} from 'redux-devtools-extension'; 

import userReducer from './userReducer';
import userGameReducer from './userGameReducer';

import {Game} from './userGameReducer';
import {User} from './userReducer';
export interface RootState {
  userReducer: User,
  userGameReducer: Game
}

const reducer = combineReducers({
  userReducer: userReducer,
  userGameReducer: userGameReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware()));