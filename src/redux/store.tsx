import {createStore, CombineReducers, applyMiddleware} from 'redux'; 
import {composeWithDevTools} from 'redux-devtools-extension'; 

export default createStore(reducer, composeWithDevTools(applyMiddleware))