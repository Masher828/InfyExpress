import {Service} from './Service';
import {User} from './User';
import {Quote} from './Quote';
import {Booking} from './Booking';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

export const store= applyMiddleware(thunk)(createStore)(combineReducers({Service,Quote,User,Booking}));
