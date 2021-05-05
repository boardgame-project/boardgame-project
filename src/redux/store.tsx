import {createStore, combineReducers, applyMiddleware} from 'redux'; 
import {composeWithDevTools} from 'redux-devtools-extension'; 

import userReducer from './userReducer';
import userGameReducer from './userGameReducer';
import meccatReducer from './meccatReducer';

import {UserGame} from './userGameReducer';
import {User} from './userReducer';
import {MecCatState} from './meccatReducer';
export interface RootState {
  userReducer: User,
  userGameReducer: UserGame,
  meccatReducer: MecCatState
}

const reducer = combineReducers({
  userReducer: userReducer,
  userGameReducer: userGameReducer,
  meccatReducer: meccatReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware()));