import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    userReducer
} from './Redux/Reducers/userReducers';

import { businessReducer } from './Redux/Reducers/businessReducers';

const reducer = combineReducers({
    userData: userReducer,
    businessData: businessReducer
});

const userTokenLS = localStorage.getItem('token') ? 
JSON.parse(localStorage.getItem('token')) : '';

const initialState = {
    userData: {token: userTokenLS} 
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;