import { combineReducers, createStore } from 'redux';
import userDetails from './userDetails';

const reducer = combineReducers({ userDetails })
const store = createStore(reducer);


export default store;
